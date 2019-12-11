import * as request from '../request'
import { createCommunitiesFetchUrl } from '../../constants/url-generator'

export default userName => {
    return request.post(createCommunitiesFetchUrl(),
        {
            communitySearchText: '',
            appShortName: 'SIMS',
            userName
        }
    ).then(request.jsonResponse)
}
