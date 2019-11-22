import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { get, first } from 'lodash'

function parseName(record, key) {
    return prospect ? `${get(record, `${key}.firstName`)} ${get(record, `${key}.lastName`)}` : undefined
}

function parsePhone(record, key) {
    return first(get(record, `${key}.phoneNumbers`, [])
        .filter(p => p.primary && p.phoneNumber)
        .map(p => parsePhoneNumberFromString("+1" + p.phoneNumber).formatNational()))
}

export default (record) => {
    return {
        leadid: record.leadId,
        ccleadid: record.ccLeadId,
        community: record.buildingName,
        hasaddtl: record.hasAddlInfluencers,
        prospectid: get(record, 'prospect.contactId'),
        pname: parseName(record, 'prospect'),
        iname: parseName(record, 'primaryInfluencer'),
        spname: parseName(record, 'secondPerson'),
        pemail: get(record, 'prospect.emailAddress'),
        iemail: get(record, 'primaryInfluencer.emailAddress'),
        spemail: get(record, 'secondPerson.emailAddress'),
        pphone: parsePhone(record, 'prospect'),
        iphone: parsePhone(record, 'primaryInfluencer'),
        spphone: parsePhone(record, 'secondPerson')
    }
}
