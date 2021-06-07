import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditBlock from './EditBlock'
import { Droppable } from 'react-beautiful-dnd'
class EditPage extends Component {
  renderBlocks() {
    return this.props.blocks.map((block, index) => {
      return (
        <Droppable key={block.id} droppableId={block.id}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <EditBlock
                index={index}
                tagName={block.tagName} // Cnn change the tag name
                html={block.html}
                key={block.id}
                id={block.id}
                placeHolderMsg={block.id}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )
    })
  }
  render() {
    return <>{this.renderBlocks()}</>
  }
}
const mapStateToProps = (state) => {
  return { blocks: Object.values(state.blocks) }
}

export default connect(mapStateToProps)(EditPage)
