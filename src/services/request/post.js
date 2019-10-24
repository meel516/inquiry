import createFetch from './create-fetch'

export default (url, payload ) => createFetch(url, 'POST', payload)