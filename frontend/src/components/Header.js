import React, { Component } from 'react'
import GoogleAuth from './GoogleAuth'
import { Navbar, Container } from 'react-bootstrap'

export default class Header extends Component {
  render() {
    return (
      <Container>
        <Navbar>
          <Navbar.Brand href='#home'>Notion-Clone</Navbar.Brand>
          <Navbar.Collapse className='justify-content-end'>
            <Navbar.Text>
              <GoogleAuth />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    )
  }
}
