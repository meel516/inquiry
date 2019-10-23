import request from '../request'
import getEndpointUrl from './get-endpoint-url'

export default username => {
    return request.post(encodeURI(`${getEndpointUrl()}/searchByAppAndUser`),
        {
            communitySearchText: '',
            appShortName: 'SIMS',
            username
        }
    ).then(res => res.json())
}
