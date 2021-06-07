import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import { connect } from 'react-redux'
import { addBlock, updateBlock, deleteBlock } from '../actions'
import DropdownMenu from './DropdownMenu'
import { Draggable } from 'react-beautiful-dnd'
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
    console.log(this.props)
    return (
      <>
        <Draggable draggableId={this.props.id} index={this.props.index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
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
                  border: '1px solid red',
                  marginTop: '1rem',
                  display: 'inline-block',
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
