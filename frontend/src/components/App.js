import React, { Component } from 'react'
import './App.css'
import './blankpage/EditBlock'
import UserPage from './userPage/UserPage'
import Header from '../components/Header'
import { Router, Route } from 'react-router-dom'
import history from './history'
import { connect } from 'react-redux'
import EditPage from './blankpage/EditPage'
class App extends Component {
  // If a user login, show his/her pages data .
  // If a guest on the page, show the blocks (demo of the app).
  renderOptions() {
    const { userId } = this.props.auth
    if (!userId) {
      return EditPage
    }
    if (userId) {
      return UserPage
    }
  }
  render = () => {
    return (
      <>
        <Router history={history}>
          <Header />
          <Route path='/' exact component={this.renderOptions()} />
          <Route path='/:id' exact component={this.renderOptions()} />
        </Router>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, blocks: state.blocks }
}

export default connect(mapStateToProps)(App)
