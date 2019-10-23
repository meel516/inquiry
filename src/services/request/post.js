import createFetch from './create-fetch'

export default (url, payload ) => fetch(url, createFetch('POST', payload))