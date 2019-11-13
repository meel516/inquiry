import React, { useCallback, useMemo, useState } from 'react';
import { Person } from './components/Person';
import { Address } from '../Address';
import { ContactMatchesModal } from './components/ContactMatchesModal';
import canHaveDuplicates from '../../services/deduplication/can-have-duplicates'
import findDuplicates from '../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../services/Types'
import { useFormikContext } from 'formik';

const TYPE = 'influencer';

export const Influencer = ({ basePath, duplicateCheck, hasAddress, contact, isContactCenter, locked }) => {
  const [ duplicateContacts, setDuplicateContacts ] = useState([]);
  const [ runDuplicateCheck, setRunDuplicateCheck ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);
  const { setFieldValue } = useFormikContext();

  const leadFieldOverrides = useMemo(() => {
    return isContactCenter ? {}
      : {
        inquiryType: 0,
        leadSource: 0,
        leadSourceDetail: 0,
        additionalDetail: '',
      };
  }, [isContactCenter]);

  const rows = useMemo(() => {
    return ObjectMappingService.createContactDuplicateGridContent(duplicateContacts);
  }, [duplicateContacts]);

  const handleDuplicateDependentInputChange = useCallback(() => setRunDuplicateCheck(true), [setRunDuplicateCheck]);
  const handleDupeCheck = useCallback(async () => {
    if (duplicateCheck && runDuplicateCheck &&  canHaveDuplicates(contact)) {
      await findDuplicates(contact)
        .then((data) => {
          setDuplicateContacts(data);
          setRunDuplicateCheck(false);
          setShowModal(true)
        })
    }
  }, [contact, duplicateCheck, runDuplicateCheck, setRunDuplicateCheck, setDuplicateContacts, setShowModal]);
  const closeModal = useCallback(() => setShowModal(false), [setShowModal]);
  const submitModal = useCallback((selectedContact, selectedLead) => {
    const duplicateContactData = duplicateContacts.find(q => q.contactId === selectedContact.contactid);
    
    if (duplicateContactData) {
      const formContact = ObjectMappingService.createContact(duplicateContactData);
      setFieldValue(`${basePath}.${TYPE}`, formContact);

      if (formContact.gender) {
        setFieldValue(`${basePath}.callerType`, formContact.gender);
      }
    }

    setFieldValue(basePath, { ...selectedLead, ...leadFieldOverrides });
    setShowModal(false);
  }, [leadFieldOverrides, setShowModal, basePath, duplicateContacts, setFieldValue]);

  return (
    <>
      <Person
        basePath={basePath}
        type={TYPE}
        locked={locked}
        onDuplicateFieldChange={handleDuplicateDependentInputChange}
        onDuplicateFieldBlur={handleDupeCheck}
      />
      { hasAddress && (<Address basePath={`${basePath}.${TYPE}`} locked={locked} />) }
      { duplicateCheck && (
        <ContactMatchesModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={submitModal}
          rows={rows}
        />
      )}
    </>
  )
}