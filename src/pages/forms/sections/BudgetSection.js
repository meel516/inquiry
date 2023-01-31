import React from 'react';
import PropTypes from 'prop-types';
import { Note } from '../../../components/form-items';
import { Drivers, FinancialOptions } from '../../../components/checkbox-groups';
import { SecondPerson } from '../../../components/persons';
import { StyledFormSection } from './styled';

export const BudgetSection = React.memo(({
                                             hasSecondPerson,
                                             isSecondPersonAutoFilled,
                                             formikErrors
                                         }) => (
    <StyledFormSection id='budget'>
        <Note name='lead.notes.financialSituation' label="Financial Situation" />
        <FinancialOptions basePath='lead.financialOptions' />
        <Note name='lead.notes.additionalNotes' label="Additional Notes" />
        <Drivers basePath='lead.drivers' formikErrors={formikErrors}/>
        <SecondPerson basePath='lead'
                      hasSecondPerson={hasSecondPerson}
                      isSecondPersonAutoFilled={isSecondPersonAutoFilled}/>
    </StyledFormSection>
));

BudgetSection.displayName = 'BudgetSection';
BudgetSection.propTypes = {
    hasSecondPerson:          PropTypes.bool,
    isSecondPersonAutoFilled: PropTypes.bool.isRequired,
    formikErrors:             PropTypes.object,
};
