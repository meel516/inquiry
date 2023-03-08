import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Form, withFormik } from 'formik';
import { toast } from 'react-toastify';
import { AlertConfirm } from '../../components/alert-confirm';
import {endSubmit, formValidationSchema, startSubmit} from './ValidationSchema';
import { Checkbox } from '../../components/form-items';
import { StyledCheckboxGroupWrapper } from '../../components/checkbox-groups/styled';
import { Debug } from '../../components/Debug';
import { SalesAPIService } from "../../services/SalesServices";
import { FormikContextWrapper } from '../../hooks';
import { getCommunitiesErrors, getRequiredCommunityError } from './validators';
import {
  BudgetSection,
  InfluencerSection,
  PassionPersonalitySection,
  ResultOfCallSection,
  SituationSection,
} from './sections';

const InquiryForm = ({
                       values,
                       errors,
                       status,
                       isValid,
                       isSubmitting,
                       setFieldTouched,
                       setFieldValue,
                       validateForm,
                       handleSubmit,
                     }) => {
  const TOP = useRef(null);

  const [prospectIsLocked, setProspectIsLocked] = useState(false);

  const isLeadFromContactCenterBuilding = useCallback((lead) => {
    return lead.buildingId === 225707;
  }, []);

  const { user, lead: { influencer, leadSource, leadSourceDetail, leadId, callingFor, secondPerson, resultOfCall,  }} = values;
  const isLocked = !!leadId;
  const isExistingContact = !!influencer.contactId;
  const isContactCenterBuildingId = isLeadFromContactCenterBuilding(values.lead);
  const hideProspect = (callingFor === 'Myself' && !(values.lead.prospect && values.lead.prospect.contactId)) || values.lead.swapProspect;
  const prospectOnlyInCC = (values.lead.prospectOnlyHasCC);
  const editContactSelected = !!(values.lead.editContact);
  const lockCallingFor = (callingFor === 'Myself' && values.lead.editContact);

  // this is kind of the same as isExistingContact/isLocked, but clearer about what's going on.
  const contactNewness = {
    influencerIsNew: !isExistingContact,
    prospectIsNew:   !isLocked,
  };

  const [editNames, setEditNames] = useState(undefined);
  useEffect(() => {
    // If the prospect's first name is 'Unknown', then allow editing of the name. But only set this flag on when the
    // prospect's contact ID changes, otherwise as soon as you start typing it will lock down.
    const firstName = values.lead.prospect.firstName;
    setEditNames(firstName.toUpperCase() === 'Unknown'.toUpperCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values.lead.prospect.contactId, // recompute edit names flag when the lead changes
          // but notably, no dep on the firstName (which is why the deps warning is disabled above)
  ]);

  useEffect(() => {
    // Establish whether the prospect section should be locked - is there a contact ID or not 
    const prospectLocked = !!values?.lead?.prospect?.contactId;
    setProspectIsLocked(prospectLocked);
  }, [setProspectIsLocked, values.lead.prospect]);

  const editContact = useCallback(() => {
    setFieldValue(`lead.editContact`, true);
  }, [ setFieldValue ]);

  const wrappedFormikValues = useMemo(() => {
            return {
              status,
              setFieldValue,
              hideProspect,
              isContactCenterBuildingId,
              isExistingContact,
              isLocked,
              setFieldTouched,
              prospectOnlyInCC,
              editContactSelected,
              editNames,
              contactNewness
            };
          },
          [status,
            setFieldValue,
            hideProspect,
            isContactCenterBuildingId,
            isExistingContact,
            isLocked,
            setFieldTouched,
            prospectOnlyInCC,
            editContactSelected,
            editNames,
            contactNewness]);

  const handleFormSubmit = useCallback((e) => {
    handleSubmit(e);

    if (!isValid) {
      toast.error("Please fix the errors before continuing.", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    setTimeout(() => TOP.current.scrollIntoView({ behavior: 'smooth' }), 500);
  }, [isValid, handleSubmit]);

  const updateLead = useCallback((lead) => {
    console.log(lead);
    const age = lead.prospect ? lead.prospect.age || '' : '';
    const newLead = {
      ...values.lead,
      ...lead,
      adlNeeds: { ...values.lead.adlNeeds, ...lead.adlNeeds },
      drivers: { ...values.lead.drivers, ...lead.drivers },
      financialOptions: { ...values.lead.financialOptions, ...lead.financialOptions },
      memoryConcerns: { ...values.lead.memoryConcerns, ...lead.memoryConcerns },
      mobilityConcerns: { ...values.lead.mobilityConcerns, ...lead.mobilityConcerns },
      notes: { ...values.lead.notes, ...lead.notes },
      nutritionConcerns: { ...values.lead.nutritionConcerns, ...lead.nutritionConcerns },
      prospect: { ...values.lead.prospect, ...lead.prospect, age },
      secondPerson: { ...values.lead.secondPerson, ...lead.secondPerson },
    };
    setFieldValue('lead', newLead);
    validateForm({
      ...values,
      lead:             newLead,
    });
  }, [values, setFieldValue, validateForm]);

  /**
   * Ultimate callback for the "Edit Prospect" flow
   * @type {(function(*): void)|*}
   */
  const updateProspect = useCallback((lead) => {
    console.log(lead);
    const age = lead.prospect ? lead.prospect.age || '' : '';
    let newLead;
    if (lead.prospect) {
      // user selected a lead - let's rewrite our state with the new lead (and leave the prospect fields locked)
      newLead = {
        ...values.lead,
        ...lead,
        adlNeeds: { ...values.lead.adlNeeds, ...lead.adlNeeds },
        drivers: { ...values.lead.drivers, ...lead.drivers },
        financialOptions: { ...values.lead.financialOptions, ...lead.financialOptions },
        memoryConcerns: { ...values.lead.memoryConcerns, ...lead.memoryConcerns },
        mobilityConcerns: { ...values.lead.mobilityConcerns, ...lead.mobilityConcerns },
        notes: { ...values.lead.notes, ...lead.notes },
        nutritionConcerns: { ...values.lead.nutritionConcerns, ...lead.nutritionConcerns },
        prospect: { ...values.lead.prospect, ...lead.prospect, age },
        // secondPerson: { ...values.lead.secondPerson, ...lead.secondPerson }, // this merges the incoming data and form data, which I think we don't want 
        secondPerson: { ...lead.secondPerson },
      };
      setFieldValue('lead', newLead);
    } else {
      // user selected "None of these" - we need to clear out all the prospect information that was previously filled
      // in (and unlock the prospect fields). I computed this by diffing the Formik state between "select influencer
      // only" and "select influencer+lead, and then clear the influencer".
      const newProspect = {
        "firstName": "",
        "lastName": "",
        "gender": "",
        "email": "",
        "phone": {
          "number": "",
          "type": ""
        },
        "age": "",
        veteranStatus: "",
      };
      // 'undefined' here means remove from the object
      newLead = {
        ...values.lead,
        influencer:              {
          ...values.lead.influencer,
          influencerId: undefined
        },
        callingFor:              "",
        inquiryType:             0,
        leadSource:              0,
        leadSourceDetail:        0,
        referralText:            "",
        referralText2nd:         "",
        leadId:                  undefined,
        leadTypeId:              undefined,
        leadCareTypeId:          undefined,
        veteranStatus:           undefined,
        reasonForCall:           undefined,
        salesStage:              undefined,
        buildingId:              undefined,
        hasInfluencers:          undefined,
        leadSourceDetailOptions: undefined,
        prospect:                newProspect,
      };
      setFieldValue('lead', newLead);
    }
    validateForm({
      ...values,
      lead: newLead,
    });
  }, [values, setFieldValue, validateForm]);

  return (
    <Form>
      <FormikContextWrapper.Provider value={wrappedFormikValues}>
        <section>
          <div ref={TOP}></div>
        </section>
        <Row>
          <Col>
            <Button color="primary" size="sm" aria-pressed="false" disabled={!prospectOnlyInCC} onClick={editContact}>Edit Contact</Button>
          </Col>
        </Row>
        <InfluencerSection influencer={influencer}
                           isLocked={isLocked || isExistingContact}
                           isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding}
                           updateLead={updateLead}
                           editContactSelected={editContactSelected}/>
        <SituationSection influencer={influencer}
                          locked={prospectIsLocked}
                          isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding}
                          updateProspect={updateProspect}
                          editContactSelected={editContactSelected}
                          formikErrors={errors}/>
        <PassionPersonalitySection username={user.username} requiredCommunityError={errors.requiredCommunityError} />

        <p>
        Ok, great! I'm going to read a brief legal disclaimer, at the end of which I'll need your consent.
        By opting in, you agree to receive recurring automated marketing text messages (such as visit reminders) from Brookdale at the number you've provided. Consent is not a condition of any purchase. Message & data rates may apply. View our Terms and Privacy at brookdale.com/texting.
        Do you agree to receive text messages?
        </p>
        <StyledCheckboxGroupWrapper>
          <Checkbox name='lead.textOptInCheckbox' label='Text Messaging Opt In' />
        </StyledCheckboxGroupWrapper>

        <BudgetSection hasSecondPerson={secondPerson.selected}
                       isSecondPersonAutoFilled={secondPerson.contactId !== undefined}
                       formikErrors={errors}/>
        <ResultOfCallSection leadSource={leadSource} lead={values.lead} leadSourceDetail={leadSourceDetail} resultOfCall={resultOfCall} updateLead={updateLead} lockCallingFor={lockCallingFor}/>
        {
          !status.readOnly && (
            <div className="float-right">
              <AlertConfirm handleSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
            </div>
          )
        }
      </FormikContextWrapper.Provider>
      {process.env.REACT_APP_NODE_ENV !== "production" && <Debug />}
    </Form>
  );
}

const EnhancedInquiryForm = withFormik({
  displayName: 'InquiryForm',
  enableReinitialize: true,
  validationSchema: formValidationSchema,
  validateOnChange: false,
  validateOnMount: true,
  validate: (values) => {

    const requiredCommunityError = getRequiredCommunityError(values.communities, values.lead.resultOfCall);
    if (requiredCommunityError) {
      return { requiredCommunityError };
    }

    const errors = getCommunitiesErrors(values.communities, values.lead.resultOfCall);
    return errors.some(x => !!x)
      ? { communities: errors }
      : {};
  },
  mapPropsToValues: ({ lead, user }) => ({ lead, user, communities: [] }),
  mapPropsToStatus: () => ({ readOnly: false, successful: false }),
  handleSubmit: (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
    startSubmit();
    const salesService = new SalesAPIService();
    salesService.submitToService({ ...values })
      .then(() => {
        setStatus({ successful: true, readOnly: true });
        toast.success("Request was submitted successfully.", {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .catch((err) => {
        setStatus({ successful: false, readOnly: false, error: true });
        toast.error(err.message, {
          position: toast.POSITION.TOP_CENTER
        });
      })
      .finally(() => {
        setSubmitting(false);
        endSubmit();
      })
  },
})(InquiryForm);

export default EnhancedInquiryForm;
