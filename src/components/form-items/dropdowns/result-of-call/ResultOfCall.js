import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Select } from '../../../formik-inputs';
import { TransactionDetailsModal } from './TransactionDetailsModal';
import { useFormikContextWrapper } from '../../../../hooks';
import { resultOfCallRequiresTransactionDetails } from '../../../../pages/forms/validators';
import { getResultOfCall } from '../../../../services/dropdowns';
import { paths } from './paths';
import { LostClosedStatusId } from '../../../../constants/sales-status'

export const ResultOfCall = ({ basePath, value, locked = false }) => {
  const [ resultofcalls, setResultOfCalls ] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const { setFieldValue, setFieldTouched } = useFormikContextWrapper();
  // eslint-disable-next-line
  const [ _reasonField, reasonFieldMeta ] = useField(paths.reason);
  // eslint-disable-next-line
  const [ _destinationField, destinationFieldMeta ] = useField(paths.destination);
  // eslint-disable-next-line
  const [ salesStageField, salesStageFieldMeta ] = useField(paths.salesStage);
  const name = `${basePath}.resultOfCall`;

  const resultOfCallOptions = useMemo(() => {
    return resultofcalls.map(resultofcall => {
      return <option key={resultofcall.value} value={resultofcall.value}>{resultofcall.text}</option>
    })
  }, [resultofcalls]);

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
      //else if (!destinationFieldMeta.touched)
        //setFieldTouched(paths.destination);
    }
  }, [reasonFieldMeta, destinationFieldMeta, setFieldTouched, setModalOpen])

  const handleCancel = useCallback(() => {
    clearTransactionDetails();
    setFieldValue(name, '');
    setModalOpen(false);
  }, [setModalOpen, setFieldValue, clearTransactionDetails, name])

  useEffect(() => {
    getResultOfCall()
      .then(data => setResultOfCalls(data));
  }, [setResultOfCalls])

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
        <TransactionDetailsModal isOpen={modalOpen} onUpdate={handleUpdate} onClose={handleCancel} stageId={salesStageField.value}/>
      )}
    </>
  )
}

ResultOfCall.propTypes = {
  basePath: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}