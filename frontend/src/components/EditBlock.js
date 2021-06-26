import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from 'react-redux'
import { addBlock, updateBlock, deleteBlock } from '../actions'
import DropdownMenu from './DropdownMenu'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGripVertical } from '@fortawesome/free-solid-svg-icons'
class EditBlock extends Component {
  constructor(props) {
    super(props)
    this.contentEditable = React.createRef()
  }
  // Handle different keys
  onKeyDownHandler = (event) => {
    // If the user hit Enter, insert a new block below the currfent Block
    if (event.key === 'Enter') {
      event.preventDefault()
      let selectedTag = event.target.outerText
      if (selectedTag === null) {
        selectedTag = 'p'
      }
      this.props.addBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
        tag: event.target.outerText,
      })
    }

    // If the user hitted enter and current block is empty, delete this block
    if (event.key === 'Backspace' && !this.props.html) {
      event.preventDefault()
      this.props.deleteBlock({
        id: this.props.id,
        ref: this.contentEditable.current,
      })
    }
  }
  updateNewBlock = (event) => {
    this.props.updateBlock({
      id: this.props.id,
      html: event.target.value,
    })
  }
  render() {
    return (
      <>
        <Draggable draggableId={this.props.id} index={this.props.index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div
                style={{
                  display: 'inline-block',
                  marginRight: '0.5rem',
                }}
              >
                <button
                  className='btn btn-outline-secondary btn-sm'
                  type='button'
                  style={{ cursor: 'grab' }}
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </button>
              </div>
              <DropdownMenu
                id={this.props.id}
                blockRef={this.contentEditable}
              />
              <ContentEditable
                innerRef={this.contentEditable}
                html={this.props.html} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onKeyDown={this.onKeyDownHandler} // handle innerHTML change
                tagName={this.props.tagName} // Use a custom HTML tag (uses a div by default)
                placeholder={this.props.placeHolderMsg}
                id={this.props.uid}
                style={{
                  border: '3px solid transparent',
                  borderImage:
                    'linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)',
                  borderImageSlice: '1',

                  margin: '20px auto',
                  marginTop: '1rem',
                  display: 'inline-block',
                  cursor: 'text',
                }}
                onChange={this.updateNewBlock}
              />
            </div>
          )}
        </Draggable>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return { blocks: state.blocks }
}
export default connect(mapStateToProps, { addBlock, updateBlock, deleteBlock })(
  EditBlock
)
