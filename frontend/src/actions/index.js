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
