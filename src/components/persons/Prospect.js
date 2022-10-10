import React, {useCallback, useState} from 'react';
import {Button, Col, FormGroup, Label, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import { Input } from '../formik-inputs';
import { Person } from './components/Person';
import { useFormikContextWrapper } from '../../hooks';
import canHaveDuplicates from '../../services/deduplication/can-have-duplicates';
import {ContactMatchesModalProspect} from './components/ContactMatchesModalProspect';

const TYPE = 'prospect';

export const Prospect = ({
                             basePath,
                             contact,
                             updateProspect,
                             isLeadFromContactCenterBuilding,
                             allowSearch,
                             locked,
                         }) => {
    const { hideProspect, editContactSelected } = useFormikContextWrapper();
    const agePath = `${basePath}.${TYPE}.age`;
    const [ showModal, setShowModal ] = useState(false);

    const handleDupeCheck = useCallback(() => {
        if (canHaveDuplicates(contact)) {
            setShowModal(true);
        }
    }, [contact, setShowModal]);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, [setShowModal]);

    const submitModal = useCallback((duplicateContact, selectedLead = null) => {
        let leadUpdates = {};
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
        updateProspect(leadUpdates);
    }, [closeModal, updateProspect, isLeadFromContactCenterBuilding]);

    let person = null;
    if (!hideProspect) {
        person = <>
            <Button color="primary"
                    size="sm"
                    aria-pressed="false"
                    disabled={!allowSearch || !locked}
                    onClick={handleDupeCheck}>Edit Prospect</Button>
            <Person basePath={basePath}
                    type={TYPE}
                    locked={locked && !editContactSelected}/>
            {showModal && (<ContactMatchesModalProspect contact={contact}
                                                isOpen={showModal}
                                                onClose={closeModal}
                                                onSubmitProspect={submitModal}/>)}
        </>;
    }

    return (<>
                <Row>
                    <Col>
                        <Label className="section-header">Prospect</Label>
                    </Col>
                </Row>
        {person}
        <Row>
            <Col xs="1" md="6">
                <FormGroup>
                    <Label for={agePath} className="label-format">Age</Label>
                    <Input type="number" name={agePath} placeholder="Age"/>
                </FormGroup>
            </Col>
        </Row>
            </>)
}

Prospect.propTypes = {
    basePath:                        PropTypes.string.isRequired,
    hideProspect:                    PropTypes.bool,
    contact:                         PropTypes.object.isRequired,
    updateProspect:                  PropTypes.func.isRequired,
    isLeadFromContactCenterBuilding: PropTypes.func.isRequired,
    allowSearch:                     PropTypes.bool.isRequired,
    locked:                          PropTypes.bool.isRequired,
};

Prospect.defaultProps = {
    showProspect: true,
    allowSearch: true,
}