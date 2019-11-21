import React from 'react';
import PropTypes from 'prop-types';
import { Note } from '../../../components/form-items';
import { Drivers, FinancialOptions } from '../../../components/checkbox-groups';
import { SecondPerson } from '../../../components/persons';
import { StyledFormSection } from './styled';

export const BudgetSection = React.memo(({ isReadOnly, isLocked, hasSecondPerson }) => (
    <StyledFormSection id='budget'>
        <Note name='lead.notes.financialSituation' label="Financial Situation" />
        <FinancialOptions basePath='lead.financialOptions' isReadOnly={isReadOnly} />
        <Note name='lead.notes.additionalNotes' label="Additional Notes" />
        <Drivers basePath='lead.drivers' isReadOnly={isReadOnly} />
        <SecondPerson basePath='lead' hasSecondPerson={hasSecondPerson} locked={isLocked} />
    </StyledFormSection>
))

BudgetSection.displayName = 'BudgetSection';
BudgetSection.propTypes = {
    isReadOnly: PropTypes.bool.isRequired,
    isLocked: PropTypes.bool.isRequired,
    hasSecondPerson: PropTypes.bool.isRequired,
}