/**
 * Maps a SalesLeadStatus object from a SalesLead object.
 */
import salesReasonFromSalesLead from '../sales-reason-from-lead'
import salesDestinationFromSaleLead from '../sales-destination-from-lead'

export default (salesLead = {}) => ({
    status: salesLead.status,
    reason: salesReasonFromSalesLead(salesLead),
    destination: salesDestinationFromSaleLead(salesLead)
})
