import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { Checkbox } from '../form-items';
import { Person } from './components/Person';
import { Note } from '../form-items';
import { ObjectMappingService } from '../../services/Types';
import { useFormikContextWrapper } from '../../hooks';

const TYPE = 'secondPerson';

export const SecondPerson = ({ basePath, hasSecondPerson, isSecondPersonAutoFilled }) => {
    const { setFieldValue } = useFormikContextWrapper();
    const fullPath = `${basePath}.${TYPE}`;

    const handleSecondPersonChange = useCallback((e) => {
        if (!e.target.checked) {
            const emptySecondPerson = {
                selected: false,
                ...ObjectMappingService.createEmptyContact(),
            };
            setFieldValue(`${fullPath}`, emptySecondPerson);
        }
    }, [fullPath, setFieldValue]);

    const isLocked = isSecondPersonAutoFilled;

    return (
        <>
            <Row>
                <Col>
                    <Checkbox name={`${fullPath}.selected`}
                              label='Is there a 2nd Prospect?'
                              onChange={handleSecondPersonChange}
                              disabled={isLocked}/>
                </Col>
            </Row>
            {
                !!hasSecondPerson && (
                    <>
                        <Person basePath={basePath} type={TYPE} locked={isLocked} />
                        <Note name={`${basePath}.notes.secondPersonNote`} label='2nd Person Situation' />
                    </>
                )
            }
        </>
    )
};

SecondPerson.propTypes = {
    basePath:                 PropTypes.string.isRequired,
    hasSecondPerson:          PropTypes.bool,
    isSecondPersonAutoFilled: PropTypes.bool.isRequired,
};
