/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '~/theme/DemoTwo.styles'
import PageWrapper from '~/components/PageWrapper'

class IndexPage extends Component {
  static pageTransitionDelayEnter = true

  static getInitialProps = ({ query, req, res }) => {
    // do data fetching in here
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
