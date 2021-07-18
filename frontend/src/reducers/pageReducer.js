import {
  CREATE_PAGE,
  FETCH_PAGES,
  FETCH_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
} from '../reducers/types'
import _ from 'lodash'

const pageReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PAGE:
      return {
        ...state,
        [action.payload._id]: action.payload,
      }
    case CREATE_PAGE:
      return {
        ...state,
        [action.payload._id]: action.payload,
      }
    case FETCH_PAGES:
      console.log(_.mapKeys(action.payload, '_id'))
      return {
        ...state,
        ..._.mapKeys(action.payload, '_id'),
      }
    case EDIT_PAGE:
      return {
        ...state,
        [action.payload._id]: action.payload,
      }
    case DELETE_PAGE:
      return _.omit(state, action.payload)
    default:
      return state
  }
}
export default pageReducer
