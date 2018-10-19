/* eslint-disable no-confusing-arrow */
/* global window requestIdleCallback requestAnimationFrame setTimeout */
/**
 * this HOC returns a wrapped component that only renders when the
 * main thread becomes free using requestIdleCallback or
 * on older browsers pushing the render task to the end of the task queue
 * using setTimeout
 */

import React, { Component } from 'react'

export default WrappedComponent => (
  class extends Component {
    state = {
      canRender: false,
    }

    componentDidMount() {
      if (window.requestIdleCallback) {
        return requestIdleCallback(this.setCanRender)
      }

      return requestAnimationFrame(() => setTimeout(this.setCanRender, 0))
    }

    setCanRender = () => this.setState({ canRender: true })

    render = () => this.state.canRender
      ? <WrappedComponent {...this.props} />
      : null
  }
)
