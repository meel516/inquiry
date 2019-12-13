import * as request from '../../request'
import { createResultOfCallUrl } from '../../../constants/url-generator'
import createPayload from './create-payload'

export default (lead, userName) => {
    return request.post(createResultOfCallUrl(), createPayload(lead, userName))
        .then(request.jsonResponse)
}
