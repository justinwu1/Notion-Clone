import { combineReducers } from 'redux'
import authReducer from './authReducer'
import blocksReducer from './blocksReducer'

export default combineReducers({
  blocks: blocksReducer,
  auth: authReducer,
})
