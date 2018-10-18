/* eslint-disable no-confusing-arrow */
/* global window requestIdleCallback requestAnimationFrame setTimeout */

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
      ? (
        <div className="fade-in">
          <WrappedComponent {...this.props} />
          <style>{`
            @keyframes fade-in {
              from { opacity: 0 }
              to { opacity: 1 }
            }

            .fade-in {
              animation: fade-in 0.5s backwards 1
            }

          `}</style>
        </div>
      ) : null
  }
)
