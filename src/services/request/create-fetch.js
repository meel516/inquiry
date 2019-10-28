import getHeaders from './get-headers'

export default (url, method, payload) => {
    const fetchParams = {
        method,
        mode: 'cors',
        cache: 'no-cache',
        headers: { ...getHeaders() },
        body: payload ? JSON.stringify(payload) : undefined
    }
    return fetch(encodeURI(url), fetchParams)
}