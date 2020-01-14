import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Select } from '../../../formik-inputs';
import { TransactionDetailsModal } from './TransactionDetailsModal';
import { useFormikContextWrapper } from '../../../../hooks';
import { resultOfCallRequiresTransactionDetails } from '../../../../pages/forms/validators';
import { getResultOfCall, getReasons, getDestinations } from '../../../../services/dropdowns';
import { paths } from './paths';
import { useDefaultStatus } from './hooks'
import { LostClosedStatusId } from '../../../../constants/sales-status'

export const ResultOfCall = ({ basePath, value, locked = false }) => {
  const [ resultofcalls, setResultOfCalls ] = useState([]);
  const [ selectedReasonId, setSelectedReasonId ] = useState(null);
  const [ reasons, setReasons ] = useState([]);
  const [ destinations, setDestinations ] = useState([]);

  const [ modalOpen, setModalOpen ] = useState(false);
  const { setFieldValue, setFieldTouched } = useFormikContextWrapper();

  // eslint-disable-next-line
  const [ _reasonField, reasonFieldMeta ] = useField(paths.reason);
  // eslint-disable-next-line
  const [ _destinationField, destinationFieldMeta ] = useField(paths.destination);
  // eslint-disable-next-line
  const [ salesStageField, salesStageFieldMeta ] = useField(paths.salesStage);

  const defaultStatusId = useDefaultStatus(salesStageField.value);
  const name = `${basePath}.resultOfCall`;

  const resultOfCallOptions = useMemo(() => {
    return resultofcalls.map(resultofcall => {
      return <option key={resultofcall.value} value={resultofcall.value}>{resultofcall.text}</option>
    })
  }, [resultofcalls]);

  const reasonDisplay = useMemo(() => {
    if ( _reasonField.value && _reasonField.value !== 0 ) {
        let reasonItem = reasons.find((item) => item.reasonId === parseInt(_reasonField.value));
        if (reasonItem) {
          return (
            <p name="reasonText">Reason: {reasonItem.description}</p>
          )
        }
    }
  }, [ _reasonField, reasons ])

  const destinationDisplay = useMemo(() => {
    if ( _destinationField.value && _destinationField.value !== 0 ) {
      let destinationItem = destinations.find((item) => item.destinationId === parseInt(_destinationField.value));
      if (destinationItem) {
        return (
          <p name="destinationText">Destination: {destinationItem.description}</p>
        )
      }
    }
  }, [ _destinationField, destinations ])

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
    setFieldValue(name, '');
    setModalOpen(false);
  }, [setModalOpen, setFieldValue, name])

  const handleResultOfCallChange = useCallback(() => {
    clearTransactionDetails();
  }, [clearTransactionDetails])

  useEffect(() => {
    getResultOfCall()
      .then(data => setResultOfCalls(data));
  }, [setResultOfCalls])

  useEffect(() => {
    if (defaultStatusId) {
      getReasons(defaultStatusId)
        .then(data => setReasons(data));
    }
  }, [defaultStatusId, setReasons])

  useEffect(() => {
    debugger;
    if (selectedReasonId) {
      getDestinations(selectedReasonId)
        .then(data => setDestinations(data))
    }
  }, [selectedReasonId, setDestinations])

  useEffect(() => {
    if (resultOfCallRequiresTransactionDetails(value)) {
      setModalOpen(true);
      setFieldValue(paths.status, defaultStatusId)
    } else {
      clearTransactionDetails();
    }
  }, [value, setFieldValue, setModalOpen, defaultStatusId, clearTransactionDetails])

  return (
    <>
      <FormGroup>
        <Label for={name} className="label-format required-field">Result of Call</Label>
        <Select name={name} disabled={locked} onChange={handleResultOfCallChange}>
          {resultOfCallOptions}
        </Select>
        { reasonDisplay }
        { (defaultStatusId === LostClosedStatusId) && destinationDisplay }
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