import isContactCenter from './is-contact-center'

export default communities => !communities || !communities.length ? false : communities.includes(c => isContactCenter(c)) 