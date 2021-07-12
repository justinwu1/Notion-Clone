import { SIGN_IN, SIGN_OUT } from '../reducers/types'

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
