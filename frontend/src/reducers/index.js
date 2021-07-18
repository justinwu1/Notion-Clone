import { combineReducers } from 'redux'
import authReducer from './authReducer'
import blocksReducer from './blocksReducer'
import pageReducer from './pageReducer'

export default combineReducers({
  blocks: blocksReducer,
  auth: authReducer,
  pages: pageReducer,
})
