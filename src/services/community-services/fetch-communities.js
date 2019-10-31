import * as request from '../request'
import { createCommunitiesFetchUrl } from '../../constants/url-generator'

export default userName => {
    return request.post(createCommunitiesFetchUrl(),
        {
            communitySearchText: '',
            appShortName: 'SIMS',
            userName
        }
    ).then(res => res.json())
    //  TODO: Migrate the previous line to the next line after MR #76 is complete
    //  ).then(request.jsonResponse)
}
