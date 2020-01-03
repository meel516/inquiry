import styled from 'styled-components';
import { ModalBody } from 'reactstrap';

const StyledModalBody = styled(ModalBody)`
    padding: 1em 2em;
`;

const StyledDropdownWrapper = styled.div`
    display: flex;
    margin-bottom: 1.5em;

    label {
        min-width: 6.25em;
        padding-top: 0.3rem;
    }
`;

const StyledSelectWrapper = styled.div`
    width: 100%;
`;

export {
    StyledDropdownWrapper,
    StyledModalBody,
    StyledSelectWrapper,
}