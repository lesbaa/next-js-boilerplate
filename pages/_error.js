import React from 'react'
import PropTypes from 'prop-types'
import PageWrapper from '~/components/PageWrapper'
import Main from '~/components/Main'
import styles from '~/theme/error.styles'

class Error extends React.Component {
  static pageTransitionDelayEnter = false

  static getInitialProps({ res, err }) {
    if (res && res.statusCode) return { statusCode: res.statusCode }

    if (err && err.statusCode) {
      console.error(err)
      return { statusCode: err.statusCode }
    }
    return { statusCode: 500 }
  }

  componentDidMount = () => {
    this.props.pageTransitionReadyToEnter()
  }

  render() {
    return (
      <PageWrapper
        title="Oops!"
      >
        <div className="error-wrapper">
          <Main>
            {getErrorMessage(this.props.statusCode)}
          </Main>
        </div>
        <style jsx>{styles}</style>
      </PageWrapper>
    )
  }
}

Error.defaultProps = {
  pageTransitionReadyToEnter: () => {},
  statusCode: PropTypes.number,
}

Error.propTypes = {
  pageTransitionReadyToEnter: PropTypes.func,
  statusCode: 500,
}

export default Error

function getErrorMessage(code) {
  switch (code) {
    case 404: {
      return (
        <p>
          404 Error!
        </p>
      )
    }
    default: {
      return (
        <p>
          500 Error!
        </p>
      )
    }
  }
}
