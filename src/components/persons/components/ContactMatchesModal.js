import React, { useCallback, useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import { useDragHandlers,  useSalesService } from './hooks';
import findDuplicates from '../../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../../services/Types'
import { StyledModal, StyledModalContentWrapper } from './styled';
import { ContactModalContent } from './ContactModalContent';
import { LeadModalContent } from './LeadModalContent';

const contactDataSort = (a, b) => {
    if (a.firstName === b.firstName) {
        if (a.lastName < b.lastName) return -1;
        return a.lastName > b.lastName ? 1 : 0;
    }

    if (a.firstName < b.firstName) return -1;
    return a.firstName > b.firstName ? 1 : 0;
}

const leadDataSort = (a, b) => {
    if (a.prospectid === b.prospectid) {
        if (a.community < b.community) return -1;
        return a.community > b.community ? 1 : 0;
    }

    return a.prospectid - b.prospectid;
}

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
            setLeadData(leadData.sort(leadDataSort));
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
                setDuplicateContacts(data.sort(contactDataSort));
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