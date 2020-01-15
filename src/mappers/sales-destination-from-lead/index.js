/**
 * Maps a SalesDestination object from a SalesLead object.
 */
export default (salesLead = {}) => ({
    id: salesLead.destination,
    reasonId: salesLead.reason
})
