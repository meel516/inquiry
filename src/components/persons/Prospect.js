import React from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import PropTypes from 'prop-types'
import { Input } from '../formik-inputs';
import { Person } from './components/Person';

const TYPE = 'prospect';

export const Prospect = ({ basePath, hideProspect = false, locked = false }) => {
    const agePath = `${basePath}.${TYPE}.age`;

    return (
        <>
        <Row>
            <Col>
                <Label className="section-header">Prospect</Label>
            </Col>
        </Row>
        { !hideProspect && (<Person basePath={basePath} type={TYPE} locked={locked} />) }
        <Row>
            <Col xs="1" md="6">
                <FormGroup>
                    <Label for={agePath} className="label-format">Age</Label>
                    <Input 
                        type="number" 
                        name={agePath}
                        placeholder="Age" 
                    />
                </FormGroup>
            </Col>
        </Row>
        </>
    )
}

Prospect.propTypes = {
    basePath: PropTypes.string.isRequired,
    hideProspect: PropTypes.bool,
    locked: PropTypes.bool,
}

Prospect.defaultProps = {
    showProspect: true,
    locked: false,
}