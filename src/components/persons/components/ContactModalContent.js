import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import { EmptyRowsView } from './EmptyRowsView';
import { useRowGetter } from './hooks';

const columns = [
    { key: 'name', name: 'Contact Name', width: 200, resizable: true },
    { key: 'phone', name: 'Phone', width: 200, resizable: true },
    { key: 'email', name: 'Email', width: 200, resizable: true },
    { key: 'city', name: 'City', width: 200, resizable: true },
    { key: 'state', name: 'State', width: 200, resizable: true },
];

export const ContactModalContent = ({ rows, onRowSelection, onClose }) => {
    const rowGetter = useRowGetter(rows);

    return (
        <>
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
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="info" size="sm" onClick={onClose}>None of These</Button>
            </ModalFooter>
        </>
    )
}

ContactModalContent.propTypes = {
    rows: PropTypes.array.isRequired,
    onRowSelection: PropTypes.func.isRequired,
}