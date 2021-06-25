import React, { Component } from 'react'
import GoogleAuth from './GoogleAuth'

export default class Header extends Component {
  render() {
    return (
      <div>
        <GoogleAuth />
      </div>
    )
  }
}
