import React, { Component } from 'react'
import './App.css'
import './blankpage/EditBlock'
import Sidepanel from './SidePanel'
import WholeBlock from './blankpage/WholeBlock'
import Header from '../components/Header'
import { connect } from 'react-redux'

// ? Might need  to change the name of Sidepanel because it will render the whole WholeBlock + a sidepanel.

class App extends Component {
  // If a user login, show his/her pages data .
  // If a guest on the page, show the blocks (demo of the app).
  renderOptions() {
    const { userId } = this.props.auth
    if (!userId) {
      return <WholeBlock />
    }
    if (userId) {
      return <Sidepanel />
    }
  }
  render = () => {
    return (
      <>
        <Header />
        {this.renderOptions()}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps)(App)
