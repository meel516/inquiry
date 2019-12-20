import * as request from '../request'
import { createStatusUpdateUrl } from '../../constants/url-generator'
import createPayload from './create-payload'

export default (lead, userName) => {
    return request.post(createStatusUpdateUrl(), createPayload(lead, userName))
        .then(request.jsonResponse)
}
