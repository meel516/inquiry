import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { useFormikContext } from 'formik';
import { Checkbox } from '../checkboxes';
import { Person } from './components/Person';
import { Note } from '../Note';
import { ObjectMappingService } from '../../services/Types';

const TYPE = 'secondPerson';

export const SecondPerson = ({ basePath, hasSecondPerson, contactId }) => {
    const { setFieldValue } = useFormikContext();
    const fullPath = `${basePath}.${TYPE}`;
    const locked = !!contactId;

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
                    <Checkbox name={`${fullPath}.selected`} label='Is there a 2nd Prospect?' onChange={handleSecondPersonChange} />
                </Col>
            </Row>
            {
                hasSecondPerson && (
                    <>
                        <Person basePath={basePath} type={TYPE} locked={locked} />
                        <Note name={`${basePath}.notes.secondPersonNote`} />
                    </>
                )
            }
        </>
    )
}

SecondPerson.propTypes = {
  basePath: PropTypes.string.isRequired,
  hasSecondPerson: PropTypes.bool.isRequired,
  contactId: PropTypes.string,
}