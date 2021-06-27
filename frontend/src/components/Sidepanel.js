import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import EditPage from './EditPage'
import { DragDropContext } from 'react-beautiful-dnd'
import Header from './Header'
import { Navbar } from 'react-bootstrap'
import './Sidepanel.css'
export default class Sidepanel extends Component {
  render() {
    return (
      <>
        <div class='d-flex' id='wrapper'>
          <div class='border-end bg-white' id='sidebar-wrapper'>
            <div class='sidebar-heading border-bottom bg-light'>
              Start Bootstrap
            </div>
            <div class='list-group list-group-flush'>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Dashboard
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Shortcuts
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Overview
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Events
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Profile
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Status
              </a>
            </div>
          </div>

          <div id='page-content-wrapper'>
            <Header />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Container style={{ marginTop: '100px' }}>
                <EditPage />
              </Container>
            </DragDropContext>
          </div>
        </div>
      </>
    )
  }
}
