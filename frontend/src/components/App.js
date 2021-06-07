import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import './EditBlock'
import EditPage from './EditPage'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { updatePosition } from '../actions/index'
class App extends Component {
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
    // const index = this.props.blocks
    //   .map((block) => block.id)
    //   .indexOf(source.droppableId)
    result['block'] = block
    this.props.updatePosition(result)
  }
  render = () => {
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <h3 style={{ textAlign: 'center' }}>Notion Clone</h3>
          <Container style={{ marginTop: '100px' }}>
            <EditPage />
          </Container>
        </DragDropContext>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return { blocks: Object.values(state.blocks) }
}
export default connect(mapStateToProps, { updatePosition })(App)
