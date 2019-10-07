import React from 'react';
import NumberFormat from 'react-number-format';
import { Alert, Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import queryString from 'query-string';
import { Form, ErrorMessage, withFormik, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { withAuth } from '@okta/okta-react';

import AdditionalCareElements from '../../components/AdditionalCareElements';
import Address from '../../components/Address';
import ADLNeeds from '../../components/ADLNeeds';
import CareType from '../../components/CareType';
import CommunitySelect from '../../components/CommunitySelect';
import Contact from '../../components/Contact';
import Drivers from '../../components/Drivers';
import FinancialOptions from '../../components/FinancialOptions';
import InquiryType from '../../components/InquiryType';
import LeadSource from '../../components/LeadSource';
import NextSteps from '../../components/NextSteps'
import Note from '../../components/Note';
import Prospect from '../../components/Prospect';
import ReasonForCall from '../../components/ReasonForCall';
import SecondPerson from '../../components/SecondPerson';
import VeteranStatus from '../../components/VeteranStatus';
import { Debug } from '../../components/Debug';

import { SalesAPIService } from "../../services/SalesServices";
import { ObjectMappingService } from "../../services/Types";
import { CommunityService } from '../../services/CommunityServices';
import { checkAuthentication } from '../../auth/checkAuth';

class InquiryForm extends React.Component {
  state = {
    communities: [],
    allowAddCommunities: true,
    lead: null,
    loading: true,
  };

  checkAuthentication = checkAuthentication.bind(this);

  async componentDidMount() {
    const { guid, umid } = queryString.parse(this.props.location.search);
    console.log(`COID: ${guid} and UMID: ${umid}`);

    this.checkAuthentication(this.getAuthCredentials);

    var leadObj = null;
    if (guid) {
      const salesapi = new SalesAPIService()
      leadObj = await salesapi.getLeadByGuid(guid)
      this.props.setFieldValue('lead', leadObj)
    }
    else {
      leadObj = ObjectMappingService.createEmptyLead()
      this.props.setFieldValue('lead', leadObj)
    }

    if (umid) {
      leadObj.umid = umid;
      this.props.setFieldValue('lead.umid', umid)
    }

    this.setState({
      loading: false,
      lead: leadObj,
    })
  }

  getAuthCredentials = (userInfo) => {
    this.props.setFieldValue('oktaFullName', userInfo.name);
  }

  handleAddCommunity = (values) => {
    this.setState((state) => {
      let communities = values.communities
      let community = CommunityService.createCommunity()
      communities.push(community)

      let allowAddCommunities = true;
      if ( communities.length > 9) {
        allowAddCommunities = false;
      }
      return {
        communities: communities,
        allowAddCommunities: allowAddCommunities,
      }
    })
  }

  handleRemoveCommunity = (uuid, values) => {
    if (uuid !== undefined || uuid !== null) {
      let communities = (values.communities || []).filter((community) => (community.uuid !== uuid));
      let allowAddCommunities = true;

      if (communities.length < 10) {
        allowAddCommunities = true
      } else {
        allowAddCommunities = false
      }

      this.setState({
        communities: communities,
        allowAddCommunities: allowAddCommunities,
      })
      values.communities = communities || [];
    }
  }

  render() {
    const {
      values,
      status,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
      setFieldValue,
      setFieldTouched,
    } = this.props;

    if (this.state.loading) {
      return 'Loading Form...'
    }

    return (
      <Form onSubmit={handleSubmit} className="inquiryForm">
        <section className="errors">
          <Row>
            {!!status &&
              <Alert color="danger">{status}</Alert>}
          </Row>
        </section>
        <section className="influencer-section">
          <Contact key="influencer-contact" type="influencer" contact={values.lead.influencer} onChange={this.props.handleChange} onBlur={handleBlur} {...this.props}>
            <Address type="influencer" address={values.lead.influencer.address} onChange={this.props.handleChange} {...this.props} />
          </Contact>
        </section>
        <br />
        <section className="prospect-section">
          <Note labelId="situationLabel" label="Situation" id="situation" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          <Row>
            <Col>
              <ADLNeeds adlNeeds={values.lead.adlNeeds} {...this.props} />
            </Col>
          </Row>
          <br />
          <AdditionalCareElements {...this.props} />
          <br />
          <Prospect contact={this.props.values.lead.prospect} onChange={this.props.handleChange} {...this.props} />
          <br />
          <CareType onChange={handleChange} onBlur={handleBlur} {...this.props} />
          <br />
          <Row>
            <Col>
              <Note labelId="passionPersonalityLabel" label="Passions &amp; Personality" id="passionsPersonality" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
            </Col>
          </Row>
        </section>
        <Row>
          <Col>
            <Note labelId="financialSituationLabel" label="Financial Situation" id="financialSituation" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" disabled={!this.state.allowAddCommunities} onClick={() => this.handleAddCommunity(values)}>Add Community</Button>
            {this.props.values.communities.map((community, index) => (
              <CommunitySelect key={community.uuid} index={index} community={community} onRemove={() => this.handleRemoveCommunity(community.uuid, values)} {...this.props} />
            ))}
          </Col>
        </Row>
        <br />
        <hr />
        <FinancialOptions {...this.props} />
        <br />
        <Row>
          <Col>
            <Note label="Additional Notes" id="additionalNotes" onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
          </Col>
        </Row>
        <br />
        <Drivers {...this.props} />
        <br />
        <SecondPerson contact={this.props.values.lead.secondPerson} {...this.props} />
        <br />
        <Row>
          <Col md="5">
            <NextSteps id="nextStepsLabel" onChange={handleChange} onBlur={handleBlur} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="callingFor" className="label-format required-field">I am calling for</Label>
              <select className="form-control" id="callingFor" name="lead.callingFor" onChange={handleChange} onBlur={handleBlur}>
                <option value="">Select One</option>
                <option>Myself</option>
                <option>Parent</option>
                <option>Spouse</option>
                <option>Friend</option>
                <option>Other</option>
              </select>
              <ErrorMessage name="lead.callingFor" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <ReasonForCall onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.reasonForCall} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <InquiryType onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.inquiryType} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <VeteranStatus onChange={handleChange} onBlur={handleBlur} defaultValue={values.lead.prospect.veteranStatus || ''} {...this.props} />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <LeadSource key="leadsource" 
              defaultLeadSource={values.lead.leadSource} 
              defaultLeadSourceDetail={values.lead.leadSourceDetail} 
              onChange={handleChange} 
              {...this.props} 
            />
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <FormGroup>
              <Label for="umid" className="label-format required-field">UMID</Label>
              <Input name='lead.umid' 
                type="text" 
                id="umid"
                value={values.lead.umid}
                onChange={handleChange} 
                onBlur={handleBlur} 
                placeholder="UMID" />
              <ErrorMessage name="lead.umid" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <Label for="callerType" className="label-format required-field">What is the gender of the caller?</Label>
            <select className="form-control" id="callerType" name="lead.callerType" onChange={handleChange} onBlur={handleBlur}>
              <option>Select One</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unknown</option>
            </select>
            <ErrorMessage name="lead.callerType" render={msg => <Alert color="danger" className="alert-smaller-size">{msg || 'Field is required!'}</Alert>} />
          </Col>
        </Row>
        <br />

        <div className="float-right">
          <Button type="submit" color="primary" size="sm" disabled={isSubmitting}>Submit</Button>{' '}
        </div>

        {process.env.NODE_ENV !== "production" &&
          <Debug />}

      </Form>
    );
  }
}

let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

let formSchema = Yup.object().shape({
  'lead.umid': Yup.string().min(5, 'Shorty').max(7, 'Stretch').required('Required')
});

const EnhancedInquiryForm = withFormik({
  enableReinitialize: true,

  mapPropsToValues: () => {
    return {
      communities: [],
      lead: ObjectMappingService.createEmptyLead(),
    }
  },

  validationSchema: Yup.object().shape({
    lead: Yup.object().shape({
      influencer: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phone: Yup.object().shape({
          // number: Yup.string().notRequired().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number'),
          number: Yup.string().notRequired().test('influencerPhoneValid', 'Influencer Phone is not Valid', function(value) {
            if (!!value) {
              const schema = Yup.string().matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/, 'Invalid Phone Number');
              return schema.isValidSync(value);
            }
            return true;
          })
        }),
        email: Yup.string().email("Email must be valid"),
      }),
      prospect: Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        veteranStatus: Yup.string().required('Veteran Status is required'),
        // phone: Yup.object().shape({
        //   number: Yup.string().matches({phoneRegExp})          
        // }),
        email: Yup.string().email("Email must be valid"),
      }),
      umid: Yup.string().required("UMID is required"),
      careType: Yup.string().required("Care Level Recommended is required"),
      fua: Yup.string().required("Result of Call is required"),
      callingFor: Yup.string().required('Calling For is required'),
      inquiryType: Yup.string().required('Inquiry Method is required'),
      leadSource: Yup.string().required('Lead Source is required'),
      leadSourceDetail: Yup.string().required('Lead Source Detail is required'),
      callerType: Yup.string().required('Gender of Caller is required'),
    }),
  }),

  handleSubmit: (values, { setSubmitting, setErrors, setStatus }) => {
    setSubmitting(true);
    const errorHandler = {
      setErrors,
      setStatus,
    }
    const salesService = new SalesAPIService();
    let successful = salesService.submitToService({ ...values }, errorHandler);
    setSubmitting(false);
    console.log(`Was successful: ${successful}`)
  },

  displayName: 'InquiryForm',

})(InquiryForm);

export default withAuth(EnhancedInquiryForm);
