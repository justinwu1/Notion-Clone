import { combineReducers } from 'redux'
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
      const selectedTag = tagSelection[action.payload.tag]
      const id = uid()
      const newBlock = {
        id,
        tagName: selectedTag,
        html: '',
      }
      updatedBlocks = [...Object.values(blocks)]
      index = updatedBlocks.map((block) => block.id).indexOf(action.payload.id)
      // Find the index, insert the newblocks
      updatedBlocks.splice(index + 1, 0, newBlock)

      // Callback alternative for focus() function (should replace with callback)
      setTimeout(() => {
        action.payload.ref.parentElement.nextElementSibling.children[1].focus()
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
      if (action.payload.ref.parentElement.previousSibling === null) {
        return blocks
      }

      // The block is wrapped in a div, so parent -> previouSibling = last div element
      // Children[1] is the block and Children[0] is the dropdown
      const previousBlock =
        action.payload.ref.parentElement.previousSibling.children[1]
      console.log(previousBlock)

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
      return blocks
    default:
      return blocks
  }
}

export default combineReducers({
  blocks: blocksReducers,
})
