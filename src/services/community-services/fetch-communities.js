import * as request from '../request'
import getEndpointUrl from './get-endpoint-url'

export default userName => {
    return request.post(`${getEndpointUrl()}/searchByAppAndUser`,
        {
            communitySearchText: '',
            appShortName: 'SIMS',
            userName
        }
    ).then(res => res.json())
}
