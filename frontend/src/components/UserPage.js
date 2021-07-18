import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPages, fetchPages } from '../actions'
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
  async componentDidMount() {
    await this.props.fetchPages()
  }
  onSubmit = () => {
    const pagesData = {
      title: 'UNTITLED',
      googleEmail: this.props.googleEmail,
      pageData: [initialBlock],
    }
    this.props.createPages(pagesData)
  }
  renderTitle = () => {
    const userData = this.props.pages.filter(
      (page) => page.googleEmail === this.props.googleEmail
    )
    return userData.map((page) => {
      return (
        <div className='list-group-item list-group-item-action list-group-item-light p-3'>
          {page.pageData['0'].html}
        </div>
      )
    })
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
              {this.renderTitle()}
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
  return {
    googleEmail: state.auth.googleEmail,
    pages: Object.values(state.pages),
  }
}

export default connect(mapStateToProps, { createPages, fetchPages })(UserPage)
