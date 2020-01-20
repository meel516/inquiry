import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import { Select } from '../../../formik-inputs';
import { getReasons, getDestinations } from '../../../../services/dropdowns';
import { StyledDropdownWrapper, StyledModalBody, StyledSelectWrapper } from './styled';
import { paths } from './paths';
import { useDefaultStatus } from './hooks'
import { LostClosedStatusId, UnqualifiedStatusId } from '../../../../constants/sales-status'

export const TransactionDetailsModal = ({ isOpen, onUpdate, onClose, stageId }) => {
    const [ selectedReasonId, setSelectedReasonId ] = useState(null);
    const [ reasons, setReasons ] = useState([]);
    const [ destinations, setDestinations ] = useState([]);
    const defaultStatusId = useDefaultStatus(stageId);

    const handleReasonChange = useCallback((e) => {
        setSelectedReasonId(e.target.value || null);
    }, [setSelectedReasonId]);

    useEffect(() => {
        if (defaultStatusId) {
            getReasons(defaultStatusId)
                .then(data => setReasons(data));
        }
    }, [defaultStatusId, setReasons])

    useEffect(() => {
        if (selectedReasonId) {
            getDestinations(selectedReasonId)
                .then(data => setDestinations(data))
        }
    }, [selectedReasonId, setDestinations])

    const statusInput = useMemo(() => {
        if (defaultStatusId === LostClosedStatusId) {
            return (
                <Input id={paths.status} type='select' disabled={true} value={LostClosedStatusId}>
                    <option value={LostClosedStatusId}>Lost/Closed</option>
                </Input>
            )
        }
        return (
            <Input id={paths.status} type='select' disabled={true} value={UnqualifiedStatusId}>
                <option value={UnqualifiedStatusId}>Unqualified</option>
            </Input>
        )
    }, [defaultStatusId])

    const destinationInput = useMemo(() => {
        if (selectedReasonId && (defaultStatusId === LostClosedStatusId) ) {
            return (
                <StyledDropdownWrapper>
                    <Label for={paths.destination}>Destination:</Label>
                    <StyledSelectWrapper>
                        <Select name={paths.destination} placeholderValue={0}>
                            { destinations.map(({ id, description }) => <option key={id} value={id}>{description}</option>) }
                        </Select>
                    </StyledSelectWrapper>
                </StyledDropdownWrapper>
            )
        }
        return null;
    }, [selectedReasonId, defaultStatusId, destinations])

    return (
        <Modal isOpen={isOpen} size='md' style={{ maxWidth: '600px'}} toggle={onClose}>
            <ModalHeader>Stage Details</ModalHeader>
            <StyledModalBody>
                <StyledDropdownWrapper>
                    <Label for={paths.status}>Status:</Label>
                    {statusInput}
                </StyledDropdownWrapper>
                <StyledDropdownWrapper>
                    <Label for={paths.reason}>Reason:</Label>
                    <StyledSelectWrapper>
                        <Select name={paths.reason} onChange={handleReasonChange} placeholderValue={0}>
                            { reasons.map(({ reasonId, description }) => <option key={reasonId} value={reasonId}>{description}</option>) }
                        </Select>
                    </StyledSelectWrapper>
                </StyledDropdownWrapper>
                { destinationInput }
            </StyledModalBody>
            <ModalFooter>
                <Button onClick={onUpdate}>Update</Button>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </Modal>
    )
}