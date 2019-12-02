import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import { useRowGetter } from './hooks';
import { EmptyRowsView } from './EmptyRowsView';
import { StyledModalContent } from './styled';

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

export const LeadModalContent = ({ rows, onGoBack, onSubmit, onRowSelection, showLeadData }) => {
    const rowGetter = useRowGetter(rows);

    const onCellClick = useCallback(({ rowIdx }) => {
        const rowData = rows[rowIdx];
        
        // First, we need to pop a new browser window to open the SMS Notes tab for this lead.
        const href = `${process.env.REACT_APP_SALES_URL}?smsLeadId=${rowData.leadid}&targetSimsPage=NOTES&buildingId=${rowData.buildingid}`;
        window.open(href, '_blank', 'height=700,width=1000');
        
        // Finally, load the app with this lead's data.
        onRowSelection(rowData);
    }, [onRowSelection, rows])

    return (
        <StyledModalContent showLeadData={showLeadData}>
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
                    onCellSelected={onCellClick}
                />
            </ModalBody>
            <ModalFooter>
                <Button type="button" color="info" size="sm" onClick={() => onGoBack()}>Go Back</Button>
                <Button type="button" color="info" size="sm" onClick={() => onSubmit()}>None of These</Button>
            </ModalFooter>
        </StyledModalContent>
    );
}

LeadModalContent.propTypes = {
    rows: PropTypes.array.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onRowSelection: PropTypes.func.isRequired,
    showLeadData: PropTypes.bool.isRequired,
}