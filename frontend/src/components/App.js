import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './App.css'
import './EditBlock'
import EditBlock from './EditBlock'
export default class App extends Component {
  render = () => {
    return (
      <>
        <h3 style={{ textAlign: 'center' }}>Notion Clone</h3>
        <Container style={{ marginTop: '100px' }}>
          <EditBlock />
        </Container>
      </>
    )
  }
}
