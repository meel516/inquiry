export default (lead, user) => {
    return {
        leadId: lead.leadId,
        statusId: lead.statusId,
        reasonId: lead.reasonId,
        destinationId: lead.destinationId,
        resultOfCall: lead.resultOfCall,
        username: user.username,
    }
}