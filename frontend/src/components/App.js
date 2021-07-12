import React, { Component } from 'react'
import './App.css'
import './blankpage/EditBlock'
import UserPage from './UserPage'
import WholePage from './blankpage/WholePage'
import Header from '../components/Header'
import { connect } from 'react-redux'

class App extends Component {
  // If a user login, show his/her pages data .
  // If a guest on the page, show the blocks (demo of the app).
  renderOptions() {
    const { userId } = this.props.auth
    if (!userId) {
      return (
        <>
          <WholePage />
        </>
      )
    }
    if (userId) {
      return <UserPage />
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
  return { auth: state.auth, blocks: state.blocks }
}

export default connect(mapStateToProps)(App)
/*
ComponentDidMount --> GET all the page 

Click Add pagee --> Create the new page -->POST Request on creating a new page --> store and Update the state --> Rerender. 

Autosave = componentDidUpdate

TODO: Design a page reducer to store all the pages in the state, 
The state data should can be connected in this App.js, pass the props to Sidepanel
{
  pageId:{blockData:{dataAssociatesWithThatPage}}
}
*/
