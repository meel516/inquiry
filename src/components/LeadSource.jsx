import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap'
import PropTypes from 'prop-types';
import { getLeadSources, getLeadSourceDetails, getLeadSourceSubDetails } from '../services/dropdowns';
import { Select, ReactSelect } from './formik-inputs';
import { useFormikContextWrapper } from '../hooks';

export const LeadSource = ({ leadSource, lead, leadSourceDetail, basePath = 'lead', locked = false, disable2ndLeadSource }) => {
  const [leadSources, setLeadSources] = useState([]);
  const [leadSourceDetails, setLeadSourceDetails] = useState([]);
  const [leadSourceDetails2nd, setLeadSourceDetails2nd] = useState([]);
  const [leadSourceSubDetails, setLeadSourceSubDetails] = useState([]);
  const [leadSourceSubDetails2nd, setLeadSourceSubDetails2nd] = useState([]);
  const [referralDisabled, setReferralDisabled] = useState({
    referral: true,
    referral2nd: true
  });
  const [disableLeadSourceValue, setDisableLeadSourceValue] = useState(disable2ndLeadSource)
  const [referralText, setReferralText] = useState({
    referralText: '',
    referralText2nd: ''
  })
  const { setFieldValue } = useFormikContextWrapper();

  const inputNames = useMemo(() => {
    return {
      leadSource: `${basePath}.leadSource`,
      leadSourceDetail: `${basePath}.leadSourceDetail`,
      leadSourceSubDetail: `${basePath}.leadSourceSubDetail`,
      leadSourceDetailOptions: `${basePath}.leadSourceDetailOptions`,
      referralText: `${basePath}.referralText`,
      leadSource2nd: `${basePath}.leadSource2nd`,
      leadSourceDetail2nd: `${basePath}.leadSourceDetail2nd`,
      leadSourceSubDetail2nd: `${basePath}.leadSourceSubDetail2nd`,
      leadSourceDetailOptions2nd: `${basePath}.leadSourceDetailOptions2nd`,
      referralText2nd: `${basePath}.referralText2nd`,
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

  const leadSourceDetailOptions2nd = useMemo(() => {
    return leadSourceDetails2nd.map(detail => {
      return <option key={detail.value} value={detail.value}>{detail.text}</option>
    })
  }, [leadSourceDetails2nd]);

  useEffect(() => {
    getLeadSources()
      .then(sources => setLeadSources(sources.map(source => ({ ...source, value: parseInt(source.value, 10) }))));
  }, [setLeadSources]);

  const disable2ndLeadSourceCheck = useCallback(() => {
    if (locked) {
      let disable2ndLeadSource = !(lead.leadSource2nd !== undefined && lead.leadSource2nd !== null && lead.leadSource2nd !== "0");
      if (disable2ndLeadSource) {
        setDisableLeadSourceValue(true)
      } else {
        setDisableLeadSourceValue(false)
      }
    }
  }, [locked, lead.leadSource2nd]);

  useEffect(() => {
    disable2ndLeadSourceCheck();
  }, [disable2ndLeadSourceCheck])

  const disableReferral = useCallback((value, type) => {
    let disable = value === "24" ? false : true;
    let tempReferralDisabled = referralDisabled;
    let tempReferral = referralText;
    if (type === 1) {
      setFieldValue(inputNames.referralText, "");
      tempReferral.referralText = "";
      tempReferralDisabled.referral = disable;
    } else {
      setFieldValue(inputNames.referralText2nd, "");
      tempReferral.referralText2nd = "";
      tempReferralDisabled.referral2nd = disable;
    }
    setReferralText(tempReferral);
    setReferralDisabled(tempReferralDisabled)
  }, [setFieldValue, inputNames, referralDisabled, referralText]);

  const onLeadSourceChange = useCallback((e) => {
    const { value } = e.target;
    disableReferral(value, 1);
    if (!value) {
      setFieldValue(inputNames.leadSource, 0);
      setLeadSourceDetails([]);
    }

    setFieldValue(inputNames.leadSourceDetail, 0);
    setFieldValue(inputNames.leadSourceSubDetail, 0);
  }, [setLeadSourceDetails, setFieldValue, inputNames, disableReferral]);

  const on2ndLeadSourceChange = useCallback((e) => {
    const { value } = e.target;
    disableReferral(value, 2);
    if (!value) {
      setFieldValue(inputNames.leadSource2nd, 0);
      setLeadSourceDetails2nd([]);
    }
    
    setFieldValue(inputNames.leadSourceDetail2nd, 0);
    setFieldValue(inputNames.leadSourceSubDetail2nd, 0);
  }, [setLeadSourceDetails2nd, setFieldValue, inputNames, disableReferral]);

  const onLeadSourceDetailChange = useCallback((e) => {
    const { value } = e.target;

    if (!value) {
      setFieldValue(inputNames.leadSourceDetail, 0);
      setLeadSourceSubDetails([]);
    }

    setFieldValue(inputNames.leadSourceSubDetail, 0);
  }, [setLeadSourceSubDetails, setFieldValue, inputNames]);

  const on2ndLeadSourceDetailChange = useCallback((e) => {
    const { value } = e.target;

    if (!value) {
      setFieldValue(inputNames.leadSourceDetail2nd, 0);
      setLeadSourceSubDetails2nd([]);
    }

    setFieldValue(inputNames.leadSourceSubDetail2nd, 0);
  }, [setLeadSourceSubDetails2nd, setFieldValue, inputNames]);

  const onReferralTextChange = useCallback((e, inputType) => {
    const { value } = e.target;
    let tempReferral = referralText;
    if (inputType === inputNames.referralText) {
      setFieldValue(inputNames.referralText, value);
      tempReferral.referralText = value;
    } else if (inputType === inputNames.referralText2nd) {
      setFieldValue(inputNames.referralText2nd, value);
      tempReferral.referralText2nd = value;
    }
    setReferralText(tempReferral);
  }, [setFieldValue, inputNames, referralText]);

  useEffect(() => {
    async function getAndSetDetails() {
      const details = leadSource ? (await getLeadSourceDetails(leadSource)) : [];
      setLeadSourceDetails(details.map(detail => ({ ...detail, value: parseInt(detail.value, 10) })));
      setFieldValue(inputNames.leadSourceDetailOptions, details);
    }

    async function getAndSetDetails2nd() {
      const details = lead.leadSource2nd ? (await getLeadSourceDetails(lead.leadSource2nd)) : [];
      setLeadSourceDetails2nd(details.map(detail => ({ ...detail, value: parseInt(detail.value, 10) })));
      setFieldValue(inputNames.leadSourceDetailOptions2nd, details);
    }

    if (leadSource > 0) {
      getAndSetDetails();
    }

    if (lead.leadSource2nd > 0) {
      getAndSetDetails2nd();
    }

    setReferralText({
      referralText: lead.referralText || '',
      referralText2nd: lead.referralText2nd || ''
    })
  }, [leadSource, setFieldValue, inputNames, lead.leadSource2nd, setReferralText, lead.referralText, lead.referralText2nd])

  useEffect(() => {
    async function getAndSetSubDetails() {
      const subdetails = leadSourceDetail ? (await getLeadSourceSubDetails(leadSourceDetail)) : [];
      const mappedSubDetails = subdetails.map(subdetail => ({ value: parseInt(subdetail.value, 10), label: `${subdetail.text}` }));
      setLeadSourceSubDetails(mappedSubDetails);
    }

    async function getAndSetSubDetails2nd() {
      const subdetails = lead.leadSourceDetail2nd ? (await getLeadSourceSubDetails(lead.leadSourceDetail2nd)) : [];
      const mappedSubDetails = subdetails.map(subdetail => ({ value: parseInt(subdetail.value, 10), label: `${subdetail.text}` }));
      setLeadSourceSubDetails2nd(mappedSubDetails);
    }

    if (leadSourceDetail > 0) {
      getAndSetSubDetails();
    }

    if (lead.leadSourceDetail2nd > 0) {
      getAndSetSubDetails2nd();
    }
  }, [leadSourceDetail, lead.leadSourceDetail2nd])

  return (
    <>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSource} className='label-format required-field'>Lead Source</Label>
            <Select name={inputNames.leadSource} disabled={locked} onChange={onLeadSourceChange}>
              {leadSourceOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceDetail} className='label-format required-field'>Lead Source Detail</Label>
            <Select name={inputNames.leadSourceDetail} disabled={locked} onChange={onLeadSourceDetailChange}>
              {leadSourceDetailOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceSubDetail} className='label-format'>Additional Detail</Label>
            <ReactSelect name={inputNames.leadSourceSubDetail} options={leadSourceSubDetails} disabled={locked} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.referralText} className='label-format'>Referral Text</Label>
            <input type={'text'} name={inputNames.referralText} disabled={referralDisabled.referral || locked} className="form-control" value={referralText.referralText} onChange={e => onReferralTextChange(e, inputNames.referralText)} placeholder="Enter Referral Text" maxLength={100} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSource2nd} className='label-format'>2nd Lead Source</Label>
            <Select name={inputNames.leadSource2nd} disabled={referralDisabled.referral2nd && disableLeadSourceValue && locked} onChange={on2ndLeadSourceChange}>
              {leadSourceOptions}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceDetail2nd} className='label-format'>2nd Lead Source Detail</Label>
            <Select name={inputNames.leadSourceDetail2nd} disabled={referralDisabled.referral2nd && disableLeadSourceValue && locked} onChange={on2ndLeadSourceDetailChange}>
              {leadSourceDetailOptions2nd}
            </Select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.leadSourceSubDetail2nd} className='label-format'>2nd Additional Detail</Label>
            <ReactSelect name={inputNames.leadSourceSubDetail2nd} options={leadSourceSubDetails2nd} disabled={referralDisabled.referral2nd && disableLeadSourceValue && locked} />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for={inputNames.referralText2nd} className='label-format'>2nd Referral Text</Label>
            <input type={'text'} name={inputNames.referralText2nd} disabled={referralDisabled.referral2nd || (disableLeadSourceValue && locked)} className="form-control" value={referralText.referralText2nd} onChange={e => onReferralTextChange(e, inputNames.referralText2nd)} placeholder="Enter Referral Text" maxLength={100} />
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