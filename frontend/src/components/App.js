import React, { Component } from 'react'
import './App.css'
import './blankpage/EditBlock'
import Sidepanel from './SidePanel'
import WholeBlock from './blankpage/WholeBlock'
import Header from '../components/Header'
import { connect } from 'react-redux'
// TODO: Structure the component, if user login = render sidepanel + Editable Page
// TODO: If user not login, show only the demo (editable Page)
// TODO: change class to className
// * Two solution to structure the component
/*
    1.  Keep Sidepanel as sidepanel component. Pass a bunch of component to show in sidepanel. If user login,pass a bunch
    2. Make sidepanel no longer a sidepanel but a screen that user login.
      - Change the name of sidepanel because it's the screenafter user login
            - Put navbar(sign in button etc) in top of App.js
      - If(user logined)render the editpage + sidepanel
      - If(user not login)render the editpage only
    */
class App extends Component {
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
