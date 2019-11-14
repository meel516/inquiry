import React, { useEffect, useMemo, useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap'
import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { getLeadSources, getLeadSourceDetails, getLeadSourceSubDetails } from '../services/dropdowns';
import { Select } from './formik-inputs';

export const LeadSource = ({ leadSource, leadSourceDetail, basePath = 'lead', locked = false }) => {
  const [ leadSources, setLeadSources ] = useState([]);
  const [ leadSourceDetails, setLeadSourceDetails ] = useState([]);
  const [ leadSourceSubDetails, setLeadSourceSubDetails ] = useState([]);
  const { setFieldValue } = useFormikContext();

  const inputNames = useMemo(() => {
    return {
      leadSource: `${basePath}.leadSource`,
      leadSourceDetail: `${basePath}.leadSourceDetail`,
      leadSourceSubDetail: `${basePath}.leadSourceSubDetail`,
    }
  }, [basePath]);

  const leadSourceOptions = useMemo(() => {
    return leadSources.map(source => {
      return <option key={source.value} value={source.value}>{source.text}</option>;
    })
  }, [leadSources]);

  const leadSourceDetailOptions = useMemo(() => {
    return leadSourceDetails.map(detail => {
      return <option key={detail.value} value={detail.value}>{detail.text}</option>
    })
  }, [leadSourceDetails]);

  const leadSourceSubDetailOptions = useMemo(() => {
    return leadSourceSubDetails.map(detail => {
      return <option key={detail.value} value={detail.value}>{detail.text}</option>
    })
  }, [leadSourceDetails]);

  useEffect(() => {
    getLeadSources()
      .then(sources => setLeadSources(sources));
  }, [setLeadSources]);

  useEffect(() => {
    if (leadSource) {
      getLeadSourceDetails(leadSource)
        .then(details => setLeadSourceDetails(details));
    } else {
      setFieldValue(inputNames.leadSourceDetail, -1);
      setLeadSourceDetails([]);
    }
  }, [leadSource, inputNames, setLeadSourceDetails, setFieldValue])

  useEffect(() => {
    debugger;
    if (leadSourceDetail) {
      getLeadSourceSubDetails(leadSourceDetail)
        .then(subdetails => setLeadSourceSubDetails(subdetails));
    } else {
      setFieldValue(inputNames.leadSourceSubDetail, -1);
      setLeadSourceSubDetails([]);
    }
  }, [leadSourceDetail, inputNames, setLeadSourceSubDetails, setFieldValue])

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSource} className='label-format required-field'>Lead Source</Label>
            <Select name={inputNames.leadSource} disabled={locked} placeholder='Select One'>
              {leadSourceOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceDetail} className='label-format required-field'>Lead Source Detail</Label>
            <Select name={inputNames.leadSourceDetail} disabled={locked} placeholder='Select One'> 
              {leadSourceDetailOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceSubDetail} className='label-format'>Additional Detail</Label>
            <Select name={inputNames.leadSourceSubDetail} disabled={locked} placeholder='Select One'>
              {leadSourceSubDetailOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
    </>
  )
}

LeadSource.propTypes = {
  leadSource: PropTypes.number.isRequired,
  leadSourceDetail: PropTypes.number.isRequired,
  basePath: PropTypes.string,
  locked: PropTypes.bool,
}