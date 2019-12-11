import React, { useCallback, useMemo, useRef } from 'react';
import { Form, withFormik } from 'formik';
import { toast } from 'react-toastify';
import { AlertConfirm } from '../../components/alert-confirm';
import { formValidationSchema } from './ValidationSchema';
import { Debug } from '../../components/Debug';
import { SalesAPIService } from "../../services/SalesServices";
import { getCommunitiesErrors } from './validators';
import { FormikContextWrapper } from '../../hooks';
import {
  BudgetSection,
  InfluencerSection,
  PassionPersonalitySection,
  ResultOfCallSection,
  SituationSection,
} from './sections';

const InquiryForm = ({
  values,
  status,
  isValid,
  isSubmitting,
  setFieldValue,
  validateForm,
  handleSubmit,
}) => {
  const TOP = useRef(null);

  const isLeadFromContactCenterBuilding = useCallback((lead) => {
    return lead.buildingId === 225707;
  }, []);

  const { user, lead: { influencer, leadSource, leadSourceDetail, leadId, callingFor, secondPerson }} = values;
  const isLocked = !!leadId;
  const isExistingContact = !!influencer.contactId;
  const isContactCenterBuildingId = isLeadFromContactCenterBuilding(values.lead);
  const hideProspect = callingFor === 'Myself' && !(values.lead.prospect && values.lead.prospect.contactId);

  const wrappedFormikValues = useMemo(() => {
    return { status, setFieldValue, hideProspect, isContactCenterBuildingId, isExistingContact, isLocked };
  }, [status, setFieldValue, hideProspect, isContactCenterBuildingId, isExistingContact, isLocked ]);

  const handleFormSubmit = useCallback((e) => {
    handleSubmit(e);
    
    if (!isValid) {
      toast.error("Please fix the errors before continuing.", {
        position: toast.POSITION.TOP_CENTER
      });
    }

    setTimeout(() => TOP.current.scrollIntoView({ behavior: 'smooth' }), 500);
  }, [isValid, handleSubmit])

  const updateLead = useCallback((lead) => {
    const age = lead.prospect
      ? lead.prospect.age || ''
      : '';
    const newLead = {
      ...values.lead,
      ...lead,
      adlNeeds: { ...values.lead.adlNeeds, ...lead.adlNeeds },
      drivers: { ...values.lead.drivers, ...lead.driveers },
      financialOptions: { ...values.lead.financialOptions, ...lead.financialOptions },
      memoryConcerns: { ...values.lead.memoryConcerns, ...lead.memoryConcerns },
      mobilityConcerns: { ...values.lead.mobilityConcerns, ...lead.mobilityConcerns },
      notes: { ...values.lead.notes, ...lead.notes },
      nutritionConcerns: { ...values.lead.nutritionConcerns, ...lead.nutritionConcerns },
      prospect: { ...values.lead.prospect, ...lead.prospect, age },
      secondPerson: { ...values.lead.secondPerson, ...lead.secondPerson },
    };
    setFieldValue('lead', newLead);
    validateForm( { ...values, lead: newLead });
  }, [values, setFieldValue, validateForm])

  return (
    <Form>
      <FormikContextWrapper.Provider value={wrappedFormikValues}>
        <section>
          <div ref={TOP}></div>
        </section>
        <InfluencerSection influencer={influencer} isLocked={isLocked || isExistingContact} isLeadFromContactCenterBuilding={isLeadFromContactCenterBuilding} updateLead={updateLead} />
        <SituationSection />
        <PassionPersonalitySection username={user.username} />
        <BudgetSection hasSecondPerson={secondPerson.selected} />
        <ResultOfCallSection leadSource={leadSource} leadSourceDetail={leadSourceDetail} />
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
    const errors = getCommunitiesErrors(values.communities);
    return errors.some(x => !!x)
      ? { communities: errors }
      : {};
  },
  mapPropsToValues: ({ lead, user }) => ({ lead, user, communities: [] }),
  mapPropsToStatus: () => ({ readOnly: false, successful: false }),
  handleSubmit: (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
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
      .finally(() => setSubmitting(false))
  },
})(InquiryForm);

export default EnhancedInquiryForm;
