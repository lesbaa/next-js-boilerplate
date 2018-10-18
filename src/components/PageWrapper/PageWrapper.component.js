import React from 'react'
import PropTypes from 'prop-types'
// import TYPES from '~/constants/types'
import '~/utils/polyfills'
import PageHead from '~/components/PageHead'
import Loader from '~/components/Loader'

import styles from './PageWrapper.styles'

const PageWrapper = ({
  children,
  title,
}) => (
  <div
    className="PageWrapper"
  >
    <Loader />
    <PageHead
      title={`Les Moffat | ${title}`}
    />
    {children}
    <style jsx>{styles}</style>
  </div>
)

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),
  title: PropTypes.string,
}

PageWrapper.defaultProps = {
  children: null,
  title: 'InfoDistrictes',
}

export default PageWrapper
