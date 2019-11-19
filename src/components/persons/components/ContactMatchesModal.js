import React, { useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useDragHandlers,  useSalesService } from './hooks';
import findDuplicates from '../../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../../services/Types'
import { StyledModal, StyledModalContentWrapper } from './styled';
import { ContactModalContent } from './ContactModalContent';
import { LeadModalContent } from './LeadModalContent';

export const ContactMatchesModal = ({ contact, isOpen, onClose, onSubmit }) => {
    const [ duplicateContacts, setDuplicateContacts ] = useState([]);
    const [ leadData, setLeadData ] = useState([]);
    const [ modalContentReady, setModalContentReady ] = useState(false);
    const [ showLeadData, setShowLeadData ] = useState(false);
    const [ onStart, onStop ] = useDragHandlers();
    const [ selectedContact, setSelectedContact ] = useState(null);
    const salesService = useSalesService();

    const handleGoBack = useCallback(() => setShowLeadData(false), [setShowLeadData]);

    const submitModal = useCallback((selectedLead) => {
        const duplicateContactData = duplicateContacts.find(q => q.contactId === selectedContact.contactid);
        onSubmit(duplicateContactData, selectedLead);
    }, [selectedContact, duplicateContacts, onSubmit]);

    const onContactSelection = useCallback(async (row) => {
        if (row) {
            const leadData = await salesService.retrieveLeadDataForContactId(row.contactid);
            setLeadData(leadData);
            setSelectedContact(row);
            setShowLeadData(true);
        }
    }, [setLeadData, setSelectedContact, setShowLeadData, salesService]);

    const onLeadSelection = useCallback(async (row) => {
        if (row) {
            const loadedLeadId = row.ccleadid || row.leadid;

            if (loadedLeadId) {
                const lead = await salesService.getLeadByLeadId(loadedLeadId);
                submitModal(lead);
            }
        }
    }, [submitModal, salesService]);

    const contactRows = useMemo(() => {
        return ObjectMappingService.createContactDuplicateGridContent(duplicateContacts);
      }, [duplicateContacts]);

    useEffect(() => {
        findDuplicates(contact)
            .then((data) => {
                setDuplicateContacts(data);
                setModalContentReady(true);
            })
    }, [contact, setDuplicateContacts, setModalContentReady])

    return (
        <Draggable handle=".duplicate-contact-modal" { ...{ onStart, onStop }}>
            <StyledModal className="duplicate-contact-modal" isOpen={isOpen} size="xl">
                <StyledModalContentWrapper>
                    {modalContentReady && (
                        <>
                            <ContactModalContent
                                rows={contactRows}
                                onRowSelection={onContactSelection}
                                onClose={onClose}
                                showLeadData={showLeadData}
                            />
                            <LeadModalContent
                                rows={leadData}
                                onRowSelection={onLeadSelection}
                                onGoBack={handleGoBack}
                                onSubmit={submitModal}
                                showLeadData={showLeadData}
                            />
                        </>)
                    }
                </StyledModalContentWrapper>
            </StyledModal>
        </Draggable>
    )
}

ContactMatchesModal.propTypes = {
    contact: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}