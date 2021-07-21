import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditBlock from './EditBlock'
import { Droppable, DragDropContext } from 'react-beautiful-dnd'
import { Container } from 'react-bootstrap'
import {
  updatePosition,
  updateBlock,
  fetchPage,
  fetchBlock,
  editPage,
} from '../../actions'
let originalData
let paramsId
class EditPage extends Component {
  componentDidMount() {
    this.unlisten = this.props.history.listen(async (location) => {
      paramsId = location.pathname.substring(1)
      if (this.props.match.params.id) {
        await this.props.fetchPage(paramsId)
        if (this.props.page) {
          this.props.fetchBlock(this.props.page.pageData)
          originalData = this.props.blocks
        }
      }
    })
  }
  componentDidUpdate() {
    if (originalData) {
      for (let i = 0; i < this.props.blocks.length; i++) {
        for (let key in this.props.blocks[i]) {
          if (originalData[i][key] !== this.props.blocks[i][key]) {
            // Update the page if there is a difference
            this.props.editPage({ _id: paramsId, pageData: this.props.blocks })
          }
        }
      }
    }
  }
  componentWillUnmount() {
    this.unlisten()
  }
  onDragEnd = (result) => {
    const { destination, source } = result
    // If no destination, exit
    if (!destination) {
      return
    }

    // Check if user drag the item back to the original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const block = this.props.blocks[source.index]
    result['block'] = block
    this.props.updatePosition(result)
  }
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
    return (
      <>
        <Container style={{ marginTop: '100px' }}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            {this.renderBlocks()}
          </DragDropContext>
        </Container>
      </>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    blocks: Object.values(state.blocks),
    page: state.pages[ownProps.match.params.id],
  }
}

export default connect(mapStateToProps, {
  updateBlock,
  fetchPage,
  updatePosition,
  fetchBlock,
  editPage,
})(EditPage)
