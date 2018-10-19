import { combineReducers } from 'redux'
import infoModalReducer from './infoDialog.reducer'
import networkReducer from './network.reducer'

const reducers = {
  infoDialog: infoModalReducer,
  network: networkReducer,
}


export default combineReducers(reducers)
