import getHeaders from './get-headers'
import ccFetch from './cc-fetch';

export default (url, method, payload) => {
    const fetchParams = {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: { ...getHeaders() },
        body: payload ? JSON.stringify(payload) : undefined
    }
    return ccFetch(encodeURI(url), fetchParams)
}