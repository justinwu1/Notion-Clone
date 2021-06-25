import { combineReducers } from 'redux'
import authReducer from './authReducer'
const uid = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

// A function to set the  cursor pointer at the end of previous block
const setCaretToEnd = (element) => {
  const range = document.createRange()
  const selection = window.getSelection()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
  element.focus()
}
// The first block when the page loads
const initialId = uid()
const initialBlock = {
  id: initialId,
  html: '',
  tagName: 'h1',
  placeHolderMsg: 'Header 1',
}

const tagSelection = {
  'Heading 1': 'h1',
  'Heading 2': 'h2',
  'Heading 3': 'h3',
  Paragraph: 'p',
}
const blocksReducers = (blocks = { initialBlock }, action) => {
  let updatedBlocks
  let index
  switch (action.type) {
    // Insert a new block next to the current block
    case 'ADD_BLOCK':
      let selectedTag = tagSelection[action.payload.tag]

      // Add placeholder to the blocks
      let placeHolderMsg
      for (let key in tagSelection) {
        if (tagSelection[key] === selectedTag) {
          placeHolderMsg = key
          break
        }
      }
      // If no selected Tag, its a div
      if (!selectedTag) {
        selectedTag = 'div'
      }
      if (!placeHolderMsg) {
        placeHolderMsg = 'Click + to add blocks, the panel to drag blocks'
      }
      const id = uid()
      const newBlock = {
        id,
        tagName: selectedTag,
        html: '',
        placeHolderMsg,
      }
      updatedBlocks = [...Object.values(blocks)]
      index = updatedBlocks.map((block) => block.id).indexOf(action.payload.id)
      // Find the index, insert the newblocks
      updatedBlocks.splice(index + 1, 0, newBlock)

      // Callback alternative for focus() function (should replace with callback)

      setTimeout(() => {
        action.payload.ref.parentElement.parentElement.nextElementSibling.children[0].children[2].focus()
      }, 10)
      return { ...updatedBlocks }

    // Keep the html element in the state
    case 'UPDATE_BLOCK':
      updatedBlocks = [...Object.values(blocks)]
      index = updatedBlocks.map((block) => block.id).indexOf(action.payload.id)
      updatedBlocks[index] = {
        ...updatedBlocks[index],
        tag: updatedBlocks.tag,
        html: action.payload.html,
      }
      return { ...updatedBlocks }

    case 'DELETE_BLOCK':
      // If theres only one block, do nothing
      if (
        action.payload.ref.parentElement.parentElement.previousSibling === null
      ) {
        return blocks
      }

      // The block is wrapped in a div, so parent -> previouSibling = last div element
      // Children[1] is the block and Children[0] is the dropdown
      const previousBlock =
        action.payload.ref.parentElement.parentElement.previousSibling
          .children[0].children[2]

      // If theres a previousBlock, delete it using splice
      if (previousBlock) {
        updatedBlocks = [...Object.values(blocks)]
        index = updatedBlocks
          .map((block) => block.id)
          .indexOf(action.payload.id)
        updatedBlocks.splice(index, 1)
        setTimeout(() => {
          setCaretToEnd(previousBlock)
          previousBlock.focus()
        }, 10)
        return { ...updatedBlocks }
      }
      console.log('Ran')
      return blocks
    case 'UPDATE_POSITION':
      updatedBlocks = [...Object.values(blocks)]
      updatedBlocks.splice(action.payload.source.index, 1)
      updatedBlocks.splice(
        action.payload.destination.index,
        0,
        action.payload.block
      )
      return { ...updatedBlocks }
    default:
      return blocks
  }
}

export default combineReducers({
  blocks: blocksReducers,
  auth: authReducer,
})
