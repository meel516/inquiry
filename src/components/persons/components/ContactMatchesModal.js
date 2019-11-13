import React, { useCallback, useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import Draggable from 'react-draggable';
import { useDragHandlers, useRowGetter, useSalesService } from './hooks';
import { LeadDataModal } from './LeadDataModal';
import { EmptyRowsView } from './EmptyRowsView';

const columns = [
    { key: 'name', name: 'Contact Name', width: 200, resizable: true },
    { key: 'phone', name: 'Phone', width: 200, resizable: true },
    { key: 'email', name: 'Email', width: 200, resizable: true },
    { key: 'city', name: 'City', width: 200, resizable: true },
    { key: 'state', name: 'State', width: 200, resizable: true },
];

export const ContactMatchesModal = ({ isOpen, onClose, onSubmit, rows }) => {
    const [ leadData, setLeadData ] = useState([]);
    const [ showLeadDataModal, setShowLeadDataModal ] = useState(false);
    const [ onStart, onStop ] = useDragHandlers();
    const [ selectedContact, setSelectedContact ] = useState(null);
    const salesService = useSalesService();
    const rowGetter = useRowGetter(rows);
    const onRowSelection = useCallback(async (row) => {
        if (row) {
            const leadData = await salesService.retrieveLeadDataForContactId(row.contactid);
            setLeadData(leadData);
            setSelectedContact(row);
            setShowLeadDataModal(true);
        }
    }, [setLeadData, setSelectedContact, setShowLeadDataModal, salesService]);
    const handleClose = useCallback((closeAll = false) => {
        setShowLeadDataModal(false);
        if (closeAll) {
            onClose();
        }
    }, [onClose, setShowLeadDataModal]);
    const submitModal = useCallback((selectedLead) => {
        setShowLeadDataModal(false);
        onSubmit(selectedContact, selectedLead);
    }, [selectedContact, setShowLeadDataModal, onSubmit]);

    return (
        <Draggable handle=".modalone" { ...{ onStart, onStop }}>
            <Modal className="modalone" isOpen={isOpen} size="xl">
                <ModalHeader>Potential Contact Matches</ModalHeader>
                <ModalBody>
                    <p>Is this who you are talking to? If so, click the name below, otherwise click "None of These".</p>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={rowGetter}
                        rowsCount={rows.length}
                        minHeight={250}
                        minWidth={1100}
                        emptyRowsView={EmptyRowsView}
                        onRowClick={(_rowId, row) => onRowSelection(row)}
                    />
                    <LeadDataModal
                        isOpen={showLeadDataModal}
                        onSubmit={submitModal}
                        onClose={handleClose}
                        rows={leadData}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="info" size="sm" onClick={onClose}>None of These</Button>
                </ModalFooter>
            </Modal>
        </Draggable>
    )
}