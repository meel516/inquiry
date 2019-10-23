import getHeaders from './get-headers'

export default (url) => fetch(url, { method: 'GET', mode: 'cors', cache: 'no-cache', headers: { ...getHeaders() }})