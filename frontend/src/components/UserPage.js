import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPages } from '../actions'
import WholePage from './blankpage/WholePage'
import './UserPage.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const uid = () => {
  return '_' + Math.random().toString(36).substr(2, 9)
}

const initialId = uid()
const initialBlock = {
  id: initialId,
  html: 'UNTITLED',
  tagName: 'h1',
  placeHolderMsg: 'Header 1',
}
class UserPage extends Component {
  onSubmit = () => {
    const pagesData = {
      title: 'UNTITLED',
      googleEmail: this.props.googleEmail,
      pageData: [initialBlock],
    }
    this.props.createPages(pagesData)
  }
  render() {
    return (
      <>
        <div className='d-flex' id='wrapper'>
          <div className='border-end bg-white' id='sidebar-wrapper'>
            <div className='sidebar-heading border-bottom bg-light'>
              {this.props.googleEmail}
            </div>
            <div className='list-group list-group-flush'>
              <button
                onClick={this.onSubmit}
                className='list-group-item list-group-item-action list-group-item-light p-3'
              >
                <FontAwesomeIcon icon={faPlus} /> New Page
              </button>
            </div>
          </div>

          <div id='page-content-wrapper'>
            <WholePage />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { googleEmail: state.auth.googleEmail }
}

export default connect(mapStateToProps, { createPages })(UserPage)
