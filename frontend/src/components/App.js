import React, { Component } from 'react'
import './App.css'
import './blankpage/EditBlock'
import UserPage from './UserPage'
import WholePage from './blankpage/WholePage'
import Header from '../components/Header'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import { connect } from 'react-redux'

class App extends Component {
  // If a user login, show his/her pages data .
  // If a guest on the page, show the blocks (demo of the app).
  renderOptions() {
    const { userId } = this.props.auth
    if (!userId) {
      return WholePage
    }
    if (userId) {
      return UserPage
    }
  }
  render = () => {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Route path='/' exact component={this.renderOptions()} />
        </BrowserRouter>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, blocks: state.blocks }
}

export default connect(mapStateToProps)(App)
/*
ComponentDidMount --> GET all the page and show the title

Click Add pagee --> Create the new page -->POST Request on creating a new page --> GET Request on that page immediately --> Show it on the screen
Click on one page --> GET request on that page immediately --> Show it on the screen

Question: How to show it onto the screen? 
- GET that page data, call blockUpdate to update the blocks with the pageData,

Autosave = componentDidUpdate
*/
