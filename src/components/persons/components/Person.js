import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { Input, NumberFormat, Select } from '../../formik-inputs';
import { getPhoneTypes } from '../../../services/dropdowns';

export const Person = React.memo(({ basePath, type, locked, editNames, onDuplicateFieldChange, onDuplicateFieldBlur }) => {
    const [ phoneTypes, setPhoneTypes ] = useState([]);

    const interestedBuildingName = `${basePath}.interestedBuildingName`;

    const inputNames = useMemo(() => ({
        firstName: `${basePath}.${type}.firstName`,
        lastName: `${basePath}.${type}.lastName`,
        phone: {
            number: `${basePath}.${type}.phone.number`,
            type: `${basePath}.${type}.phone.type`,
        },
        email: `${basePath}.${type}.email`,
    }), [basePath, type]);

    useEffect(() => {
        getPhoneTypes()
                .then((data) => setPhoneTypes(data));
    }, []);

    const phoneTypeOptions = useMemo(() => {
        return (phoneTypes || []).map(type => {
            return <option key={type.value} value={type.text}>{type.text}</option>
        });
    }, [phoneTypes]);
    
    
    return (
        <>
            <Row>
                <Col></Col>
                <Col xs="1" md="6">
                    <FormGroup>
                        <Label for={interestedBuildingName} className="label-format">Most Interested In:</Label>
                        <Input type="text" name={interestedBuildingName} 
                        placeholder="Interested In"
                        disabled={locked && !editNames}/>
                    </FormGroup>
                </Col>
            </Row>
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
                            disabled={locked && !editNames}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Input
                            type='text'
                            name={inputNames.lastName}
                            placeholder='Last Name'
                            disabled={locked && !editNames}
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
                            onChange={onDuplicateFieldChange}
                            onBlur={onDuplicateFieldBlur}
                            disabled={locked}
                        />
                    </FormGroup>
                </Col>
                <Col>
                    <Label for={inputNames.phone.type} className='label-format'>Phone Type</Label>
                    <Select name={inputNames.phone.type} disabled={locked}>
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
                            onChange={onDuplicateFieldChange}
                            onBlur={onDuplicateFieldBlur}
                            placeholder='Email'
                            disabled={locked}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
})

Person.displayName = 'Person';
Person.propTypes = {
    basePath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    locked: PropTypes.bool,
    editNames: PropTypes.bool,
    onDuplicateFieldChange: PropTypes.func,
    onDuplicateFieldBlur: PropTypes.func,
}