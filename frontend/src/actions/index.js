import {
  CREATE_PAGE,
  FETCH_PAGES,
  FETCH_PAGE,
  DELETE_PAGE,
  EDIT_PAGE,
  SIGN_IN,
  SIGN_OUT,
} from '../reducers/types'
import pages from '../apis/pages'
import history from '../components/history'

// Page actions creator
export const createPages = (pagesData) => {
  return async (dispatch) => {
    const response = await pages.post('/', pagesData)
    dispatch({ type: CREATE_PAGE, payload: response.data })
    history.push(`/${response.data._id}`)
  }
}

export const fetchPages = () => {
  return async (dispatch) => {
    const response = await pages.get('/')
    dispatch({ type: FETCH_PAGES, payload: response.data })
  }
}

export const fetchPage = (id) => {
  return async (dispatch) => {
    const response = await pages.get(`/${id}`)
    dispatch({ type: FETCH_PAGE, payload: response.data })
  }
}

export const editPage = (id, pageData) => {
  return async (dispatch) => {
    const response = await pages.put(`/${id}`, pageData)
    dispatch({ type: EDIT_PAGE, payload: response.data })
  }
}

export const deletePage = (id) => {
  return async (dispatch) => {
    await pages.delete(`${id}`)
    dispatch({ type: DELETE_PAGE, payload: id })
  }
}

// Blocks actions creator
export const addBlock = (currentBlock) => {
  return {
    type: 'ADD_BLOCK',
    payload: currentBlock,
  }
}

export const updateBlock = (currentBlock) => {
  return {
    type: 'UPDATE_BLOCK',
    payload: currentBlock,
  }
}

export const deleteBlock = (currentBlock) => {
  return {
    type: 'DELETE_BLOCK',
    payload: currentBlock,
  }
}

export const updateItem = (menu) => {
  return {
    type: 'UPDATE_ITEM',
    payload: menu,
  }
}

export const updatePosition = (result) => {
  return {
    type: 'UPDATE_POSITION',
    payload: result,
  }
}

// This action creator will update the block state by getting the data in the database
export const fetchBlock = (response) => {
  return {
    type: 'FETCH_BLOCK',
    payload: response,
  }
}

// Auth Action Creator
export const signIn = (userId, googleEmail) => {
  return {
    type: SIGN_IN,
    payload: { userId, googleEmail },
  }
}

export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}
