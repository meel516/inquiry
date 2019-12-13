import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import { Select } from '../../../formik-inputs';
import { getLostClosedReasons, getLostClosedDestinations } from '../../../../services/dropdowns';
import { StyledDropdownWrapper, StyledModalBody, StyledSelectWrapper } from './styled';
import { paths } from './paths';

export const LostClosedStatusId = 5;

export const TransactionDetailsModal = ({ isOpen, onUpdate, onClose }) => {
    const [ selectedReasonId, setSelectedReasonId ] = useState(null);
    const [ reasons, setReasons ] = useState([]);
    const [ destinations, setDestinations ] = useState([]);

    const handleReasonChange = useCallback((e) => {
        setSelectedReasonId(e.target.value || null);
    }, [setSelectedReasonId]);

    useEffect(() => {
        getLostClosedReasons(LostClosedStatusId)
            .then(data => setReasons(data));
    }, [setReasons])

    useEffect(() => {
        if (selectedReasonId) {
            getLostClosedDestinations(selectedReasonId)
                .then(data => setDestinations(data))
        }
    }, [selectedReasonId, setDestinations])

    return (
        <Modal isOpen={isOpen} size='md' toggle={onClose}>
            <ModalHeader>Stage Details</ModalHeader>
            <StyledModalBody>
                <StyledDropdownWrapper>
                    <Label for={paths.status}>Status:</Label>
                    <Input id={paths.status} type='select' disabled={true} value={LostClosedStatusId}>
                        <option value={LostClosedStatusId}>Lost/Closed</option>
                    </Input>
                </StyledDropdownWrapper>
                <StyledDropdownWrapper>
                    <Label for={paths.reason}>Reason:</Label>
                    <StyledSelectWrapper>
                        <Select name={paths.reason} onChange={handleReasonChange} placeholderValue={0}>
                            { reasons.map(({ reasonId, description }) => <option key={reasonId} value={reasonId}>{description}</option>) }
                        </Select>
                    </StyledSelectWrapper>
                </StyledDropdownWrapper>
                { selectedReasonId && (
                    <StyledDropdownWrapper>
                        <Label for={paths.destination}>Destination:</Label>
                        <StyledSelectWrapper>
                            <Select name={paths.destination} placeholderValue={0}>
                                { destinations.map(({ id, description }) => <option key={id} value={id}>{description}</option>) }
                            </Select>
                        </StyledSelectWrapper>
                    </StyledDropdownWrapper>)
                }
            </StyledModalBody>
            <ModalFooter>
                <Button onClick={onUpdate}>Update</Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}