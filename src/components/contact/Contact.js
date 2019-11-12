import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { Input, NumberFormat, Select } from '../formik-inputs';
import { Address } from '../Address';
import { getPhoneTypes } from '../../services/dropdowns'
import { ContactMatchesModal } from './components/ContactMatchesModal';
import canHaveDuplicates from '../../services/deduplication/can-have-duplicates'
import findDuplicates from '../../services/deduplication/find-duplicates';
import { ObjectMappingService } from '../../services/Types'
import { useFormikContext } from 'formik';

export const Contact = ({ basePath, type, duplicateCheck, hasAddress, contact, isContactCenter }) => {
    const [ duplicateContacts, setDuplicateContacts ] = useState([]);
    const [ locked, setLocked ] = useState(false);
    const [ phoneTypes, setPhoneTypes ] = useState([]);
    const [ runDuplicateCheck, setRunDuplicateCheck ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        getPhoneTypes()
            .then((data) => setPhoneTypes(data));
    }, []);

    const inputNames = useMemo(() => ({
        firstName: `${basePath}.${type}.firstName`,
        lastName: `${basePath}.${type}.lastName`,
        phone: {
            number: `${basePath}.${type}.phone.number`,
            type: `${basePath}.${type}.phone.type`,
        },
        email: `${basePath}.${type}.email`,
    }), [basePath]);

    const leadFieldOverrides = useMemo(() => {
        return isContactCenter ? {}
            : {
                inquiryType: 0,
                leadSource: 0,
                leadSourceDetail: 0,
                additionalDetail: '',
            };
    }, [isContactCenter]);

    const phoneTypeOptions = useMemo(() => {
        return (phoneTypes || []).map(type => {
            return <option key={type.value} value={type.text}>{type.text}</option>
          });
    }, [phoneTypes]);

    const rows = useMemo(() => {
        return ObjectMappingService.createContactDuplicateGridContent(duplicateContacts);
    }, [duplicateContacts]);

    const handleDuplicateDependentInputChange =
        useCallback(() => setRunDuplicateCheck(true), [setRunDuplicateCheck]);
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
            setFieldValue(basePath, formContact);

            if (formContact.gender) {
                setFieldValue(`${basePath}.callerType`, formContact.gender);
            }
        }

        setFieldValue(basePath, { ...selectedLead, ...leadFieldOverrides });

        setLocked(true);
        setShowModal(false);
    }, [leadFieldOverrides, setShowModal, basePath, duplicateContacts, setFieldValue, setLocked]);

    return (
        <>
            <Row>
                <Col>
                    <Label for={inputNames.firstName} className="label-format required-field">Name</Label>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Input 
                            type='text'
                            name={inputNames.firstName}
                            placeholder='First Name'
                            disabled={locked}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type='text'
                            name={inputNames.lastName}
                            placeholder='Last Name'
                            disabled={locked}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for={inputNames.phone.number} className='label-format'>Phone</Label>
                        <NumberFormat
                            name={inputNames.phone.number}
                            placeholder='Phone'
                            onChange={handleDuplicateDependentInputChange}
                            onBlur={handleDupeCheck}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Label for={inputNames.phone.type} className='label-format'>Phone Type</Label>
                    <Select name={inputNames.phone.type}>
                        <option value="">Select One</option>
                        {phoneTypeOptions}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for={inputNames.email} className='label-format'>Email</Label>
                        <Input
                            type='email'
                            name={inputNames.email}
                            onChange={handleDuplicateDependentInputChange}
                            onBlur={handleDupeCheck}
                            placeholder='Email'
                        />
                    </FormGroup>
                </Col>
            </Row>
            {hasAddress && (
                <Address
                    type="influencer"
                    address={contact.address}
                    isReadOnly={locked}
                />)
            }
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