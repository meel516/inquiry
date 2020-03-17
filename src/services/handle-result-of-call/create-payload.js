export default (lead, user) => {
    return {
        leadId: lead.leadId,
        statusId: lead.status,
        reasonId: lead.reason,
        destinationId: lead.destination,
        resultOfCall: lead.resultOfCall,
        username: user.username,
    }
}