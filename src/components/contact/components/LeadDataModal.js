import React, { useCallback } from 'react';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import Draggable from 'react-draggable';
import { useDragHandlers, useRowGetter, useSalesService } from './hooks';
import { EmptyRowsView } from './EmptyRowsView';

const columns = [
    { key: 'prospectid', name: 'Prospect ID', width: 100, resizable: true },
    { key: 'community', name: 'Community', width: 200, resizable: true },
    { key: 'iname', name: 'Influencer Name', width: 200, resizable: true },
    { key: 'iphone', name: 'Influencer Phone', width: 200, resizable: true },
    { key: 'iemail', name: 'Influencer Email', width: 200, resizable: true },
    { key: 'pname', name: 'Prospect Name', width: 200, resizable: true },
    { key: 'pphone', name: 'Prospect Phone', width: 200, resizable: true },
    { key: 'pemail', name: 'Prospect Email', width: 200, resizable: true },
    { key: 'spname', name: '2nd Person Name', width: 200, resizable: true },
    { key: 'spphone', name: '2nd Person Phone', width: 200, resizable: true },
    { key: 'spemail', name: '2nd Person Email', width: 200, resizable: true },
    { key: 'hasaddtl', name: 'Has Addtl Influencers', width: 200, resizable: true },
];

export const LeadDataModal = ({ isOpen, onClose, onSubmit, rows }) => {
    const [ onStart, onStop ] = useDragHandlers();
    const salesService = useSalesService();
    const rowGetter = useRowGetter(rows);
    const onRowSelection = useCallback(async (row) => {
        if (row) {
            const loadedLeadId = row.ccleadid || row.leadid;

            if (loadedLeadId) {
                const lead = await salesService.getLeadByLeadId(loadedLeadId);
                onSubmit(lead);
            }
        }
    }, [onSubmit, salesService]);

    return (
        <Draggable handle=".modaltwo" { ...{ onStart, onStop }}>
            <Modal className="modaltwo" isOpen={isOpen} size="xl">
                <ModalHeader>Potential Lead Matches</ModalHeader>
                <ModalBody>
                    <p>Below are leads that this person is associated with. Click the one you want to update, otherwise click "None of These". If you clicked the wrong person, click "Go Back" to change.</p>
                    <ReactDataGrid
                        columns={columns}
                        rowGetter={rowGetter}
                        rowsCount={rows.length}
                        minHeight={250}
                        minWidth={1100}
                        emptyRowsView={EmptyRowsView}
                        onRowClick={(_rowId, row) => onRowSelection(row)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="info" size="sm" onClick={() => onClose()}>Go Back</Button>
                    <Button type="button" color="info" size="sm" onClick={() => onClose(true)}>None of These</Button>
                </ModalFooter>
            </Modal>
        </Draggable>
    );
}