import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import './EditBlock'
import EditPage from './EditPage'
import { DragDropContext } from 'react-beautiful-dnd'
export default class App extends Component {
  onDragEnd = (result) => {
    // TODO: Order
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
