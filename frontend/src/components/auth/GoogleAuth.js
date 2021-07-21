import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { signIn, signOut, clearBlock } from '../../actions/index'
import { connect } from 'react-redux'

class GoogleAuth extends Component {
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
          this.onAuthChange(this.auth.isSignedIn.get())
          this.auth.isSignedIn.listen(this.onAuthChange)
        })
    })
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const googleEmail = this.auth.currentUser
        .get()
        .getBasicProfile()
        .getEmail()
      this.props.signIn(this.auth.currentUser.get().getId(), googleEmail)
    } else {
      this.props.signOut()
      this.props.clearBlock()
    }
  }

  onSignIn = () => {
    this.auth.signIn()
  }

  onSignOut = () => {
    this.auth.signOut()
  }
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
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
    return <div>{this.renderAuthButton()}</div>
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut, clearBlock })(
  GoogleAuth
)
