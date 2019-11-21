import styled, { css } from 'styled-components';
import { Button, ModalFooter } from 'reactstrap';
import { fadeIn, fadeOut } from '../../styled';

const getButtonTransition = (transformOrigin) => {
    return css`
        transform-origin: ${transformOrigin};
        transform: scaleX(0);
        transition-property: transform;
        transition-duration: 0.5s;`
}

const StyledModalFooter = styled(ModalFooter)`
    position: relative;
`;

const StyledSpinnerWrapper = styled.div`
    position: absolute;
    right: 42px;
    opacity: 0;
    ${props => props.submitting
        ? css`
            animation-name: ${fadeIn};
            animation-duration: 0.5s;
            animation-delay: 0.25s;
            animation-fill-mode: forwards;
            animation-timing-function: ease-in`
        : 'display: none'
    }
`;

const StyledYesButton = styled(Button)`
    ${props => props.submitting
        ? getButtonTransition('right') : ''}
`;

const StyledNoButton = styled(Button)`
    ${props => props.submitting
        ? getButtonTransition('left') : ''}
`;

const StyledInitialMessage = styled.span`
    position: absolute;
    top: 12px;
    opacity: 1;
    ${props => props.submitting
        ? css`animation: ${fadeOut} 0.5s ease-in forwards`
        : ''}
`;

const StyledLoadingMessage = styled.span`
    position: absolute;
    top: 12px;
    opacity: 0;
    ${props => props.submitting
        ? css`
            animation-name: ${fadeIn};
            animation-duration: 0.5s;
            animation-timing-function: ease-in-out;
            animation-delay: 0.375s;
            animation-fill-mode: forwards;`
        : ''}
    
`;

export {
    StyledInitialMessage,
    StyledLoadingMessage,
    StyledModalFooter,
    StyledSpinnerWrapper,
    StyledYesButton,
    StyledNoButton,
}