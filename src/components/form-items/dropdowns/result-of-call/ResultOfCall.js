import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormGroup, Label, Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useField, useFormikContext} from 'formik';
import { Select } from '../../../formik-inputs';
import { TransactionDetailsModal } from './TransactionDetailsModal';
import { useFormikContextWrapper } from '../../../../hooks';
import { resultOfCallRequiresTransactionDetails } from '../../../../pages/forms/validators';
import { getResultOfCall, getReasons, getDestinations } from '../../../../services/dropdowns';
import { paths } from './paths';
import { useDefaultStatus } from './hooks'
import { LostClosedStatusId } from '../../../../constants/sales-status'
import { StyledErrorMessage } from '../../../../styled';

export const ResultOfCall = ({ basePath, value, locked = false }) => {
  const [ resultofcalls, setResultOfCalls ] = useState([]);
  const [ reasons, setReasons ] = useState([]);
  const [ destinations, setDestinations ] = useState([]);

  const [ modalOpen, setModalOpen ] = useState(false);
  const { setFieldValue, setFieldTouched } = useFormikContextWrapper();
  const { errors } = useFormikContext();

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

  const statusDisplay = useMemo(() => {
    if ( defaultStatusId && defaultStatusId === LostClosedStatusId ) {
      return (
        <Row>
          <Col md="3">
            <Label for="statusText" className="font-weight-bold">Status:</Label>
          </Col>
          <Col md="9">
            <p name="statusText">Lost/Closed</p>
          </Col>
        </Row>
      )
    } else {
      return (
        <Row>
          <Col md="3">
            <Label for="statusText" className="font-weight-bold">Status:</Label>
          </Col>
          <Col md="9">
            <p name="statusText">Unqualified</p>
          </Col>
        </Row>
      )
    }
  }, [ defaultStatusId ])

  const reasonDisplay = useMemo(() => {
    if ( _reasonField.value && _reasonField.value !== 0 ) {
        let reasonItem = reasons.find((item) => item.reasonId === parseInt(_reasonField.value));
        if (reasonItem) {
          return (
            <Row>
              <Col md="3">
                <Label for="reasonText" className="font-weight-bold">Reason:</Label>
              </Col>
              <Col md="9">
                <p name="reasonText">{reasonItem.description}</p>
              </Col>
            </Row>
          )
        }
    } else {
      if (errors && errors.lead && errors.lead.reason) {
        return (
          <Row>
            <Col md="3">
              <Label for="reasonText" className="font-weight-bold">Reason:</Label>
            </Col>
            <Col md="9">
              <StyledErrorMessage>{errors.lead.reason}</StyledErrorMessage>
            </Col>
          </Row>
        )
      }
    }
  }, [ _reasonField, reasons, errors ])

  const destinationDisplay = useMemo(() => {
    if ( _destinationField.value && _destinationField.value !== 0 ) {
      let destinationItem = destinations.find((item) => item.id === parseInt(_destinationField.value));
      if (destinationItem) {
        return (
          <Row>
            <Col md="3">
              <Label for="destinationText" className="font-weight-bold">Destination:</Label>
            </Col>
            <Col md="9">
              <p name="destinationText">{destinationItem.description}</p>
            </Col>
          </Row>
        )
      }
    } else {
      if (errors && errors.lead && errors.lead.destination) {
        return (
          <Row>
            <Col md="3">
              <Label for="destinationText" className="font-weight-bold">Destination:</Label>
            </Col>
            <Col md="9">
              <StyledErrorMessage>{errors.lead.destination}</StyledErrorMessage>
            </Col>
          </Row>
        )
      }
    }
  }, [ _destinationField, destinations, errors ])

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

  const handleClose = useCallback(() => {
    setModalOpen(false);
  }, [])

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
    if (_reasonField.value && _reasonField.value !== 0) {
      getDestinations(parseInt(_reasonField.value))
        .then(data => setDestinations(data))
    }
  }, [_reasonField, setDestinations])

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
        { resultOfCallRequiresTransactionDetails(value) && statusDisplay }
        { reasonDisplay }
        { (defaultStatusId === LostClosedStatusId) && destinationDisplay }
      </FormGroup>
      { resultOfCallRequiresTransactionDetails(value) && (
        <FormGroup>
          <Button type="button" color="primary" size="sm" onClick={() => setModalOpen(true)}>Edit Stage Details</Button>
          <TransactionDetailsModal isOpen={modalOpen} onClose={handleClose} onUpdate={handleUpdate} stageId={salesStageField.value}/>
        </FormGroup>
      )}
    </>
  )
}

ResultOfCall.propTypes = {
  basePath: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  locked: PropTypes.bool,
}