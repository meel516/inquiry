import * as request from '../../request'
import { createEloquaCdoUrl } from '../../../constants/url-generator'
import createPayload from './create-payload'

export default (lead, communities, userName, userEmail) => {
    return request.post(createEloquaCdoUrl(),createPayload(lead, communities, userName, userEmail))
        .then(request.jsonResponse)
}
