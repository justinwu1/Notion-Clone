import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditBlock from './EditBlock'
import { Droppable } from 'react-beautiful-dnd'
import { updateBlock, fetchPage } from '../../actions'

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
                placeHolderMsg={block.placeHolderMsg}
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
const mapStateToProps = (state, ownProps) => {
  return {
    blocks: Object.values(state.blocks),
    // page: state.streams[ownProps.match.params.id],
  }
}

export default connect(mapStateToProps, { updateBlock, fetchPage })(EditPage)
