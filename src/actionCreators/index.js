/* global window navigator */

import {
  SHOW_INFO_DIALOG,
  HIDE_INFO_DIALOG,
  IS_FETCHING,
  IS_NOT_FETCHING,
  API_FETCH,
  API_FETCH_RECEIVE,
  API_FETCH_ERROR,
} from '~/constants/actionTypes'
import { apiFetch } from '~/utils/api'

export const setIsFetching = () => ({
  type: IS_FETCHING,
})

export const setIsNotFetching = () => ({
  type: IS_NOT_FETCHING,
})

export const reportFetchError = ({
  error,
}) => (dispatch) => {
  dispatch({
    type: API_FETCH_ERROR,
    payload: error,
  })
  console.error(error)
  dispatch(showInfoDialog({
    message: 'Error attempting to fetch!',
    timeout: 2000,
  }))
  dispatch(setIsNotFetching())
}

export const hideInfoModal = () => ({ type: HIDE_INFO_DIALOG })

export const closeAllModals = () => (dispatch) => {
  dispatch(hideInfoModal())
}

export const showInfoDialog = ({
  message,
  timeout = 1000,
}) => (dispatch) => {
  dispatch({
    type: SHOW_INFO_DIALOG,
    payload: {
      message,
    },
  })
  const t = setTimeout(() => {
    dispatch({
      type: HIDE_INFO_DIALOG,
      payload: {
        message,
      },
    })
    clearTimeout(t)
  }, timeout)
}

export const dispatchApiFetch = ({
  slidename,
  isActive = true,
} = {}) => async (dispatch, getState) => {
  dispatch({ type: API_FETCH })
  dispatch(setIsFetching())
  try {
    if (!getState().slides[slidename]) {
      const { results } = await apiFetch({
        params: {
          ...(isActive && { isActive }),
          ...(slidename && { id: slidename }),
        },
      })
      dispatch({
        type: API_FETCH_RECEIVE,
        payload: {
          slides: results,
        },
      })
    }
    dispatch(setIsNotFetching())
  } catch (error) {
    dispatch(reportFetchError({
      error,
    }))
  }
}

export const onRouteChangeStart = () => (dispatch) => {
  dispatch({ type: 'ROUTE_CHANGE_START' })
  dispatch(closeAllModals())
}

export const onRouteChangeComplete = () => (dispatch) => {
  dispatch({ type: 'ROUTE_CHANGE_COMPLETE' })
}
