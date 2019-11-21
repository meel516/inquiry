import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import PropTypes from 'prop-types'
import {
    StyledInitialMessage,
    StyledLoadingMessage,
    StyledSpinnerWrapper,
    StyledYesButton,
    StyledNoButton
} from './styled';

export const AlertConfirm = React.memo(({ handleSubmit, isSubmitting }) => {
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ submitting, setSubmitting ] = useState(false);

    const handleYes = useCallback((e) => {
        setSubmitting(true);
        handleSubmit(e);
    }, [handleSubmit, setModalOpen])

    useEffect(() => {
        if (submitting && !isSubmitting) {
            setSubmitting(false);
            setModalOpen(false);
        }
    }, [isSubmitting, submitting, setSubmitting, setModalOpen])

    return (
        <>
            <Button type="button" color="primary" size="sm" onClick={() => setModalOpen(true)}>Submit</Button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(x => !x)}>
                <ModalBody style={{ minHeight: '50px' }}>
                    <StyledInitialMessage submitting={submitting}>Are you sure you want to continue?</StyledInitialMessage>
                    <StyledLoadingMessage submitting={submitting}>Your application is being submitted.</StyledLoadingMessage>
                </ModalBody>
                <ModalFooter>
                    <StyledYesButton submitting={submitting} type="button" size="sm" color="primary" onClick={handleYes}>Yes</StyledYesButton>
                    <StyledNoButton submitting={submitting} type="button" color="secondary" size="sm" onClick={() => (setModalOpen(false), setSubmitting(false))}>No</StyledNoButton>
                    <StyledSpinnerWrapper submitting={submitting}>
                        <Spinner type="border" size="md" color="secondary">Submitting...</Spinner>
                    </StyledSpinnerWrapper>
                </ModalFooter>
            </Modal>
        </>
    )
})

AlertConfirm.displayName = 'AlertConfirm';
AlertConfirm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
}