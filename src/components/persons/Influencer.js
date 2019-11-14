import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Person } from './components/Person';
import { Address } from '../Address';
import { ContactMatchesModal } from './components/ContactMatchesModal';
import canHaveDuplicates from '../../services/deduplication/can-have-duplicates'
import findDuplicates from '../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../services/Types'

const TYPE = 'influencer';

export const Influencer = ({ basePath, contact, updateLead, isLeadFromContactCenterBuilding, locked }) => {
  const [ duplicateContacts, setDuplicateContacts ] = useState([]);
  const [ runDuplicateCheck, setRunDuplicateCheck ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const rows = useMemo(() => {
    return ObjectMappingService.createContactDuplicateGridContent(duplicateContacts);
  }, [duplicateContacts]);

  const handleDuplicateDependentInputChange = useCallback(() => setRunDuplicateCheck(true), [setRunDuplicateCheck]);
  const handleDupeCheck = useCallback(async () => {
    if (runDuplicateCheck &&  canHaveDuplicates(contact)) {
      await findDuplicates(contact)
        .then((data) => {
          setDuplicateContacts(data);
          setRunDuplicateCheck(false);
          setShowModal(true);
        })
    }
  }, [contact, runDuplicateCheck, setRunDuplicateCheck, setDuplicateContacts, setShowModal]);
  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);
  const submitModal = useCallback((selectedContact, selectedLead = null) => {
    const duplicateContactData = duplicateContacts.find(q => q.contactId === selectedContact.contactid);
    const contactUpdates = duplicateContactData ? ObjectMappingService.createContact(duplicateContactData) : {}
    let leadUpdates = {
      [TYPE]: contactUpdates,
      callerType: !contactUpdates.gender ? undefined : contactUpdates.gender,
    };

    if (selectedLead) {
      const leadFieldOverrides = isLeadFromContactCenterBuilding(selectedLead) ? {}
        : { inquiryType: 0,
            leadSource: 0,
            leadSourceDetail: 0,
            additionalDetail: '' };
      leadUpdates = {
        ...leadUpdates,
        ...selectedLead,
        ...leadFieldOverrides,
      };
    }

    updateLead(leadUpdates);
    setShowModal(false);
  }, [setShowModal, duplicateContacts, updateLead, isLeadFromContactCenterBuilding]);

  return (
    <>
      <Person
        basePath={basePath}
        type={TYPE}
        locked={locked}
        onDuplicateFieldChange={handleDuplicateDependentInputChange}
        onDuplicateFieldBlur={handleDupeCheck}
      />
      <Address basePath={`${basePath}.${TYPE}`} locked={locked} />
      <ContactMatchesModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={submitModal}
        rows={rows}
      />
    </>
  )
}

Influencer.propTypes = {
  basePath: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  updateLead: PropTypes.func.isRequired,
  isLeadFromContactCenterBuilding: PropTypes.func.isRequired,
  locked: PropTypes.bool,
}