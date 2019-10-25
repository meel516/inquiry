import moment from 'moment'

export default dateString => dateString ? moment(dateString).format('YYYY-MM-DDTHH:mm:ss.SSSZZ') : null