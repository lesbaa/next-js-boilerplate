import fetch from 'isomorphic-fetch'
import buildQueryString from '~/utils/buildQueryString'
import { API_BASE_URL } from '~/../app.config'

export const buildUrl = ({ path, params }) =>
  `//${API_BASE_URL}/${path}${buildQueryString(params)}`

export const apiFetch = async ({ params, path } = {}) => {
  const url = buildUrl({
    path,
    params,
  })
  const response = await fetch(url)
  const json = await response.json()
  return json
}
