import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import {useDragHandlers, useSalesService} from './hooks';
import findDuplicates from '../../../services/deduplication/find-duplicates';
import {StyledModal, StyledModalContentWrapper} from './styled';
import {LeadModalContent} from './LeadModalContent';

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

export const ContactMatchesModalProspect = ({ contact, isOpen, onClose, onSubmitProspect }) => {
    const [ duplicateContacts, setDuplicateContacts ] = useState([]);
    const [ leadData, setLeadData ] = useState([]);
    const [ modalContentReady, setModalContentReady ] = useState(false);
    const [ showLeadData, setShowLeadData ] = useState(false);
    const [ onStart, onStop ] = useDragHandlers();
    const salesService = useSalesService();

    const submitModalLead = useCallback((selectedLead) => {
        const duplicateContactData = duplicateContacts.find(q => q.contactId === contact.contactId);
        onSubmitProspect(duplicateContactData, selectedLead);
    }, [contact, duplicateContacts, onSubmitProspect]);

    const onLeadSelection = useCallback(async (row) => {
        if (row) {
            const loadedLeadId = row.ccleadid || row.leadid;

            if (loadedLeadId) {
                // Since a lead row could have a non-primary influencer, we need to pass that id down
                // to the service, so we load the correct influencer into the app.
                const influencerContactIdToLoad = row.inflContactId || '';
                const lead = await salesService.getLeadByLeadId(loadedLeadId, influencerContactIdToLoad);

                // We need to set a property to keep track if the ONLY COI for this Prospect ContactId is at the CC.
                // NOTE: Check to see if Prospect is null...if so, that means the lead.influencer IS the prospect.
                if (lead.prospect && !lead.prospect.contactId) {
                    lead.prospectOnlyHasCC =
                            await salesService.prospectOnlyHasContactCenterCOI(lead.influencer.contactId);
                } else {
                    lead.prospectOnlyHasCC =
                            await salesService.prospectOnlyHasContactCenterCOI(lead.prospect.contactId);
                }

                submitModalLead(lead);
            }
        }
    }, [submitModalLead, salesService]);

    useEffect(() => {
        async function fetchLeads() {
            const leadData = await salesService.retrieveLeadDataForContactId(contact.contactId);
            setLeadData(leadData.sort(leadDataSort));
            setShowLeadData(false);
        }

        fetchLeads();
    }, [contact, salesService]);

    useEffect(() => {
        findDuplicates(contact)
            .then((data) => {
                setDuplicateContacts(data.sort(contactDataSort));
                setModalContentReady(true);
            });
    }, [contact, setDuplicateContacts, setModalContentReady])

    return (
        <Draggable handle=".duplicate-contact-modal" { ...{ onStart, onStop }}>
            <StyledModal className="duplicate-contact-modal" isOpen={isOpen} size="xl">
                <StyledModalContentWrapper>
                    {modalContentReady && (
                        <>
                            <LeadModalContent
                                rows={leadData}
                                onRowSelection={onLeadSelection}
                                onGoBack={onClose}
                                onSubmit={submitModalLead}
                                showLeadData={showLeadData}
                                popOpenSims={false}
                            />
                        </>)
                    }
                </StyledModalContentWrapper>
            </StyledModal>
        </Draggable>
    )
}

ContactMatchesModalProspect.propTypes = {
    contact:          PropTypes.object.isRequired,
    isOpen:           PropTypes.bool.isRequired,
    onClose:          PropTypes.func.isRequired,
    onSubmitProspect: PropTypes.func,
};

ContactMatchesModalProspect.defaultProps = {
};