import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import ReactDataGrid from 'react-data-grid';
import { useRowGetter } from './hooks';
import { EmptyRowsView } from './EmptyRowsView';
import { StyledModalContent } from './styled';

const PROSPECT_ID_CELL_ID = 0;

const prospectCellFormatter = ({ row: { leadid, buildingid, pname } }) => {
    const href = `https://sales.uat.assisted.com/Sims?smsLeadId=${leadid}&targetSimsPage=PROSPECT&buildingId=${buildingid}`;
    return <a href={href} target='_blank'>{pname}</a>;
}

const influencerCellFormatter = ({ row: { leadid, buildingid, iname } }) => {
    const href = `https://sales.uat.assisted.com/Sims?smsLeadId=${leadid}&targetSimsPage=INFLUENCER&buildingId=${buildingid}`;
    return <a href={href} target='_blank'>{iname}</a>;
}

const columns = [
  { key: 'prospectid', name: 'Prospect ID', width: 100, resizable: true },
  { key: 'community', name: 'Community', width: 200, resizable: true },
  { key: 'iname', name: 'Influencer Name', width: 200, resizable: true, formatter: influencerCellFormatter },
  { key: 'iphone', name: 'Influencer Phone', width: 200, resizable: true },
  { key: 'iemail', name: 'Influencer Email', width: 200, resizable: true },
  { key: 'pname', name: 'Prospect Name', width: 200, resizable: true, formatter: prospectCellFormatter },
  { key: 'pphone', name: 'Prospect Phone', width: 200, resizable: true },
  { key: 'pemail', name: 'Prospect Email', width: 200, resizable: true },
  { key: 'spname', name: '2nd Person Name', width: 200, resizable: true },
  { key: 'spphone', name: '2nd Person Phone', width: 200, resizable: true },
  { key: 'spemail', name: '2nd Person Email', width: 200, resizable: true },
  { key: 'hasaddtl', name: 'Has Addtl Influencers', width: 200, resizable: true },
];

export const LeadModalContent = ({ rows, onGoBack, onSubmit, onRowSelection, showLeadData }) => {
    const rowGetter = useRowGetter(rows);

    const onCellClick = useCallback(({ idx, rowIdx }) => {
        if (idx === PROSPECT_ID_CELL_ID) {
            onRowSelection(rows[rowIdx]);
        }
    }, [onRowSelection])

    return (
        <StyledModalContent showLeadData={showLeadData}>
            <ModalHeader>Potential Lead Matches</ModalHeader>
            <ModalBody>
                <p>Below are leads that this person is associated with. Click the prospect ID for the one you want to update, otherwise click "None of These". If you clicked the wrong person, click "Go Back" to change.</p>
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