import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import './EditBlock'
import Sidepanel from './Sidepanel'
import EditPage from './EditPage'
import { DragDropContext } from 'react-beautiful-dnd'
import { connect } from 'react-redux'
import { updatePosition } from '../actions/index'
import Header from '../components/Header'
import { Navbar } from 'react-bootstrap'

class App extends Component {
  onDragEnd = (result) => {
    // TODO: Structure the component, if user login = render sidepanel + Editable Page
    // TODO: If user not login, show only the demo (editable Page)
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
  render = () => {
    return (
      <>
        <Sidepanel />
      </>
    )
  }
}
const mapStateToProps = (state) => {
  return { blocks: Object.values(state.blocks) }
}
export default connect(mapStateToProps, { updatePosition })(App)
