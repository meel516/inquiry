import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Person } from './components/Person';
import { Address } from '../Address';
import { ContactMatchesModal } from './components/ContactMatchesModal';
import canHaveDuplicates from '../../services/deduplication/can-have-duplicates'
import { ObjectMappingService } from '../../services/Types'
import { Col, FormGroup, Label, Row } from 'reactstrap';

const TYPE = 'influencer';

export const Influencer = ({ basePath, contact, updateLead, isLeadFromContactCenterBuilding, locked, mostInterestedIn }) => {
  const [ runDuplicateCheck, setRunDuplicateCheck ] = useState(false);
  const [ showModal, setShowModal ] = useState(false);

  const handleDuplicateDependentInputChange = useCallback(() => setRunDuplicateCheck(true), [setRunDuplicateCheck]);

  const handleDupeCheck = useCallback(() => {
    if (runDuplicateCheck &&  canHaveDuplicates(contact)) {
      setShowModal(true);
    }
  }, [contact, runDuplicateCheck, setShowModal]);

  const closeModal = useCallback(() => {
    setRunDuplicateCheck(false);
    setShowModal(false);
  }, [setShowModal, setRunDuplicateCheck]);

  const submitModal = useCallback((duplicateContact, selectedLead = null) => {
    const contactUpdates = duplicateContact ? ObjectMappingService.createContact(duplicateContact) : {}
    let leadUpdates = {
      [TYPE]: contactUpdates,
      callerType: !contactUpdates.gender ? undefined : contactUpdates.gender,
      textOptInCheckbox: !contactUpdates.textOptInCheckbox ? false : contactUpdates.textOptInCheckbox,
    };

    if (selectedLead) {
      const leadFieldOverrides = isLeadFromContactCenterBuilding(selectedLead) ? {}
        : { inquiryType: 0,
            leadSource: 0,
            leadSourceDetail: 0,
            leadSourceSubDetail: 0 };
      leadUpdates = {
        ...leadUpdates,
        ...selectedLead,
        ...leadFieldOverrides,
      };
    }

    closeModal();
    updateLead(leadUpdates);
  }, [closeModal, updateLead, isLeadFromContactCenterBuilding]);

  return (
    <>
    {
        mostInterestedIn !== '' && mostInterestedIn !== undefined && (
          <Row>
            <Col></Col>
            <Col xs="1" md="6">
                <FormGroup>
                    <Label for={mostInterestedIn} className="label-format">Most Interested In:</Label>
                    <b><p style={{color: "red"}}>{mostInterestedIn}</p></b>
                </FormGroup>
            </Col>
          </Row>
        )
      }
      <Person
        basePath={basePath}
        type={TYPE}
        locked={locked}
        onDuplicateFieldChange={handleDuplicateDependentInputChange}
        onDuplicateFieldBlur={handleDupeCheck}
      />
      <Address basePath={`${basePath}.${TYPE}`} locked={locked} />
      {
        showModal && (
          <ContactMatchesModal
            contact={contact}
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={submitModal}
          />
        )
      }
    </>
  )
}

Influencer.propTypes = {
  basePath: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired,
  updateLead: PropTypes.func.isRequired,
  isLeadFromContactCenterBuilding: PropTypes.func.isRequired,
  locked: PropTypes.bool,
  mostInterestedIn: PropTypes.string
}