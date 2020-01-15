/**
 * Maps a SalesReason object from a SalesLead object.
 */
export default (salesLead = {}) => ({
    reasonId: salesLead.reason,
    status: salesLead.status
})
