/* global process */
/* eslint-env browser */

import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '~/theme/DemoOne.styles'
import PageWrapper from '~/components/PageWrapper'
import BarChart from '~/components/charts/BarChart.component'
import PieChart from '~/components/charts/PieChart.component'
import Pack from '~/components/charts/Pack.component'
import Donut from '~/components/charts/Donut.component'
import Priestly from '~/components/charts/Priestly.component'
import InfoDistrictesMap from '~/components/InfoDistrictesMap'

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
        <div className="map-wrapper">
          <InfoDistrictesMap />
        </div>
        <div className="data-points-wrapper">
          <div className="data-point">
            <BarChart legend={false} />
          </div>
          <div className="data-point">
            <PieChart legend={false} />
          </div>
          <div className="data-point">
            <Pack legend={false} />
          </div>
          <div className="data-point">
            <Donut legend={false} />
          </div>
          <div className="data-point">
            <Priestly legend={false} />
          </div>
          <div className="data-point">
            <Pack legend={false} />
          </div>
          <div className="data-point">
            <Donut legend={false} />
          </div>
          <div className="data-point">
            <Priestly legend={false} />
          </div>
        </div>
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
