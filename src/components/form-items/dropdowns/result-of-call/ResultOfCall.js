import React, { useCallback, useEffect, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Select } from '../../../formik-inputs';
import { TransactionDetailsModal, LostClosedStatusId } from './TransactionDetailsModal';
import { useFormikContextWrapper } from '../../../../hooks';
import { resultOfCallRequiresTransactionDetails } from '../../../../pages/forms/validators';
import { paths } from './paths';

const resultOfCallArray = [
  { value: 1, label: 'Visit/Assessment/Home Visit Scheduled' },
  { value: 2, label: 'New Lead No Visit' },
  { value: 3, label: 'Nonqualified Lead' },
  { value: 4, label: 'Non Lead Call' },
  { value: 5, label: 'Special Event RSVP' },
  { value: 6, label: 'Webform No Response' },
];
const resultOfCallOptions = resultOfCallArray.map(result => {
  return <option key={result.value} value={result.label}>{result.label}</option>;
});

export const ResultOfCall = ({ basePath, value, locked = false }) => {
  const [ modalOpen, setModalOpen ] = useState(false);
  const { setFieldValue, setFieldTouched } = useFormikContextWrapper();
  // eslint-disable-next-line
  const [ _reasonField, reasonFieldMeta ] = useField(paths.reason);
  // eslint-disable-next-line
  const [ _destinationField, destinationFieldMeta ] = useField(paths.destination);
  const name = `${basePath}.resultOfCall`;

  const clearTransactionDetails = useCallback(() => {
    setFieldValue(paths.status, 0);
    setFieldValue(paths.reason, 0);
    setFieldValue(paths.destination, 0);
    setFieldTouched(paths.reason, false);
    setFieldTouched(paths.destination, false);
  }, [setFieldValue, setFieldTouched])
  
  const handleUpdate = useCallback(() => {
    if (!reasonFieldMeta.error && !destinationFieldMeta.error) {
      setModalOpen(false);
    } else {
      if (!reasonFieldMeta.touched)
        setFieldTouched(paths.reason);
      else if (!destinationFieldMeta.touched)
        setFieldTouched(paths.destination);
    }
  }, [reasonFieldMeta, destinationFieldMeta, setFieldTouched, setModalOpen])

  const handleCancel = useCallback(() => {
    clearTransactionDetails();
    setFieldValue(name, '');
    setModalOpen(false);
  }, [setModalOpen, setFieldValue, clearTransactionDetails, name])

  useEffect(() => {
    if (resultOfCallRequiresTransactionDetails(value)) {
      setModalOpen(true);
      setFieldValue(paths.status, LostClosedStatusId)
    } else {
      clearTransactionDetails();
    }
  }, [value, setFieldValue, setModalOpen, clearTransactionDetails])

  return (
    <>
      <FormGroup>
        <Label for={name} className="label-format required-field">Result of Call</Label>
        <Select name={name} disabled={locked}>
          {resultOfCallOptions}
        </Select>
      </FormGroup>
      { resultOfCallRequiresTransactionDetails(value) && (
        <TransactionDetailsModal isOpen={modalOpen} onUpdate={handleUpdate} onClose={handleCancel} />
      )}
    </>
  )
}

ResultOfCall.propTypes = {
  basePath: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}