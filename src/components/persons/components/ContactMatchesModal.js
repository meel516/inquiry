import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Modal } from 'reactstrap';
import Draggable from 'react-draggable';
import { useDragHandlers,  useSalesService } from './hooks';
import findDuplicates from '../../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../../services/Types'
import { ContactModalContent } from './ContactModalContent';
import { LeadModalContent } from './LeadModalContent';

export const ContactMatchesModal = ({ contact, isOpen, onClose, onSubmit }) => {
    const [ duplicateContacts, setDuplicateContacts ] = useState([]);
    const [ leadData, setLeadData ] = useState([]);
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
            .then((data) => setDuplicateContacts(data))
    }, [setDuplicateContacts])

    return (
        <Draggable handle=".duplicate-contact-modal" { ...{ onStart, onStop }}>
            <Modal className="duplicate-contact-modal" isOpen={isOpen} size="xl">
                {
                    showLeadData ? (
                        <LeadModalContent
                            onRowSelection={onLeadSelection}
                            onGoBack={handleGoBack}
                            onSubmit={submitModal}
                            rows={leadData}
                        />
                    ) : (
                        <ContactModalContent
                            rows={contactRows}
                            onRowSelection={onContactSelection}
                            onClose={onClose}
                        />
                    )
                }
            </Modal>
        </Draggable>
    )
}