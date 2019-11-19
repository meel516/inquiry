import React, { useCallback, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types'

export const AlertConfirm = ({ handleSubmit }) => {
    const [ modalOpen, setModalOpen ] = useState(false);

    const handleYes = useCallback((e) => {
        setModalOpen(false);
        handleSubmit(e);
    }, [handleSubmit, setModalOpen])

    return (
        <>
            <Button type="button" color="primary" size="sm" onClick={() => setModalOpen(true)}>Submit</Button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(x => !x)}>
                <ModalBody>Are you sure you want to continue?</ModalBody>
                <ModalFooter>
                    <Button type="button" size="sm" color="primary" onClick={handleYes}>Yes</Button>
                    <Button type="button" color="secondary" size="sm" onClick={() => setModalOpen(false)}>No</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

AlertConfirm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
}