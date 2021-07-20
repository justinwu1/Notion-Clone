import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Container } from 'react-bootstrap'
import EditPage from './EditPage'
import { updatePosition } from '../../actions/index'
import { connect } from 'react-redux'
class WholePage extends Component {
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
  render() {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Container style={{ marginTop: '100px' }}>
            <EditPage page={this.props.page} />
          </Container>
        </DragDropContext>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { blocks: Object.values(state.blocks) }
}
export default connect(mapStateToProps, { updatePosition })(WholePage)
