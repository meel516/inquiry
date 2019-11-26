import isContactCenter from '../../utils/is-contact-center'

export default community => community && isContactCenter(community.buildingId)