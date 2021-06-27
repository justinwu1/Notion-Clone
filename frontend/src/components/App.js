import React, { Component } from 'react'
import './App.css'
import './EditBlock'
import Sidepanel from './SidePanel'
import Header from '../components/Header'

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
  render = () => {
    return (
      <>
        <Header />
        <Sidepanel />
      </>
    )
  }
}
export default App
