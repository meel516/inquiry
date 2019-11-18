import styled  from 'styled-components';
import { Modal } from 'reactstrap';

const StyledModal = styled(Modal)`
    overflow: hidden;
`;

const StyledModalContentWrapper = styled.div`
    display: flex;
`;

const StyledModalContent = styled.div`
    transition: transform 0.75s;
    ${props => props.showLeadData
        ? 'transform: translateX(-100%);'
        : 'transform: translateX(0);'}
`;

export {
    StyledModal,
    StyledModalContentWrapper,
    StyledModalContent,
}