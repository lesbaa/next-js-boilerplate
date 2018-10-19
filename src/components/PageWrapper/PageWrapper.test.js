/* eslint-env jest */
/* global window */
import React from 'react'
import { shallow } from 'enzyme'
import PageHead from '~/components/PageHead'
import PageWrapper from './PageWrapper.component'


describe('Title', () => {
  const baseProps = {
    title: 'hey! a title?',
  }

  const wrapperMobile = shallow(
    <PageWrapper
      {...baseProps}
      isMobile
    >
      <div className="child-one" />
    </PageWrapper>
  )

  const wrapperDesktop = shallow(
    <PageWrapper {...baseProps} >
      <div className="child-two" />
    </PageWrapper>
  )


  it('matches its snapshots', () => {
    expect(wrapperMobile).toMatchSnapshot('mobile')
    expect(wrapperDesktop).toMatchSnapshot('desktop')
  })

  it('renders its kids', () => {
    const childOneExists = wrapperMobile
      .find('.child-one')
      .exists()

    expect(childOneExists).toBe(true)

    const childTwoExists = wrapperDesktop
      .find('.child-two')
      .exists()

    expect(childTwoExists).toBe(true)
  })

  it('passes the correct title prop to PageHead', () => {
    const pageHeadTitle = wrapperDesktop
      .find(PageHead)
      .props()
      .title

    expect(pageHeadTitle).toBe('TODO INFODISTRICTES')
  })

})
