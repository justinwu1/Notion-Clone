import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
export default class GoogleAuth extends Component {
  state = { isSignedIn: null }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '624025168041-7nouu18tlt9opckcfpuicl2hg9uc6t01.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance()
          this.setState({ isSignedIn: this.auth.isSignedIn.get() })
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get })
  }

  onSignIn = () => {
    this.auth.signIn()
  }

  onSignOut = () => {
    this.auth.signOut()
  }
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
        <button
          onClick={this.onSignOut}
          type='button'
          className='btn btn-danger'
        >
          <FontAwesomeIcon
            style={{
              fontSize: '1rem',
              color: 'white',
              paddingRight: '0.2rem',
              paddingTop: '0.2rem',
            }}
            icon={faGoogle}
          />
          Sign Out
        </button>
      )
    } else {
      return (
        <button
          onClick={this.onSignIn}
          type='button'
          className='btn btn-danger'
        >
          <FontAwesomeIcon
            style={{
              fontSize: '1rem',
              color: 'white',
              paddingRight: '0.2rem',
              paddingTop: '0.2rem',
            }}
            icon={faGoogle}
          />
          Sign in with Google
        </button>
      )
    }
  }
  render() {
    return <>{this.renderAuthButton()}</>
  }
}
