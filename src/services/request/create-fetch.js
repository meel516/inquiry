import getHeaders from './get-headers'

export default (method, payload) => ({ method, mode: 'cors', cache: 'no-cache', headers: { ...getHeaders() }, body: JSON.stringify(payload) })