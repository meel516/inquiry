import moment from 'moment'

export default dateString => dateString ? moment(dateString).format('YYYY-MM-DD HH:mm:ss') : null