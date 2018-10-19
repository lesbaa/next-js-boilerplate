import PropTypes from 'prop-types'

const ERROR = PropTypes.oneOfType([
  PropTypes.shape({
    statusCode: PropTypes.number,
    message: PropTypes.string,
  }),
  PropTypes.bool,
])

export default {
  ERROR,
  // data point etc
}
