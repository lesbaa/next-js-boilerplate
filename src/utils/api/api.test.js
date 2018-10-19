/* eslint-env jest */
import fetch from 'isomorphic-fetch'
import { API_BASE_URL } from '~/../app.config'

import { buildUrl } from './api'

jest.mock('isomorphic-fetch', () => jest.fn(
  () => ({
    json: () => mockJson(),
  })
))

const mockJson = jest.fn(() => ({
  results: ['json'],
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('buildUrl', () => {
  it('builds the url in the correct form', () => {
    const expected = `//${API_BASE_URL}/spon?a=1&b=2&c=3`
    const returned = buildUrl({
      path: 'spon',
      params: {
        a: 1,
        b: 2,
        c: 3,
      },
    })

    expect(returned).toBe(expected)
  })
})

// TODO this will need more tests as api functions are added