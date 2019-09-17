import {createProspectRequest} from '../SalesServices';

test('creates prospect request with no prospect/lead information', () => {
    const prospect = createProspectRequest(null, null);

    export(prospect.firstName).toEqual('Unknown');

});