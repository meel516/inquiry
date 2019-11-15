import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import { Checkbox } from '../form-items';
import { Person } from './components/Person';
import { Note } from '../form-items';
import { ObjectMappingService } from '../../services/Types';

const TYPE = 'secondPerson';

export const SecondPerson = ({ basePath, hasSecondPerson, locked = false }) => {
    const { setFieldValue } = useFormikContext();
    const fullPath = `${basePath}.${TYPE}`;

    const handleSecondPersonChange = useCallback((e) => {
        if (!e.target.checked) {
            const emptySecondPerson = {
                selected: false,
                ...ObjectMappingService.createEmptyContact(),
            };
            setFieldValue(`${fullPath}`, emptySecondPerson);
        }
    }, [fullPath, setFieldValue])

    return (
        <>
            <Row>
                <Col>
                    <Checkbox name={`${fullPath}.selected`} label='Is there a 2nd Prospect?' onChange={handleSecondPersonChange} disabled={locked} />
                </Col>
            </Row>
            {
                hasSecondPerson && (
                    <>
                        <Person basePath={basePath} type={TYPE} locked={locked} />
                        <Note name={`${basePath}.notes.secondPersonNote`} label='2nd Person Situation' />
                    </>
                )
            }
        </>
    )
}

SecondPerson.propTypes = {
  basePath: PropTypes.string.isRequired,
  hasSecondPerson: PropTypes.bool.isRequired,
  locked: PropTypes.bool,
}