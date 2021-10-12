import * as request from '../../request'
import { createSfmcCallAuditUrl } from '../../../constants/url-generator'
import createPayload from './create-payload'

export default (lead, communities, userName, userEmail) => {
    return request.post(createSfmcCallAuditUrl(),createPayload(lead, communities, userName, userEmail))
        .then(request.jsonResponse)
}
