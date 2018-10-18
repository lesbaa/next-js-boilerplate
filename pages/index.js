/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import PageWrapper from '~/components/PageWrapper'
import styles from '~/theme/index.styles'

class IndexPage extends Component {
  static pageTransitionDelayEnter = true

  static getInitialProps = ({ query, req, res }) => {

  }

  state = {

  }

  componentDidMount = () => {

  }

  render = () => (
    <PageWrapper
      title="PAGE TITLE"
    >
      <main
        className="main"
      >
        Hello!
      </main>
      <style jsx>{styles}</style>
    </PageWrapper>
  )
}

IndexPage.propTypes = {
  
}

IndexPage.defaultProps = {
  
}

export default IndexPage
