import React, { Component } from 'react'
import { connect } from 'react-redux'
import WholePage from './blankpage/WholePage'
import pages from '../pages'
import './UserPage.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class UserPage extends Component {
  onSubmit = async () => {
    const data = await pages.post('pages/add', {
      title: 'UNTITLED',
      googleEmail: 'testinsssg@gmail.com',
      pageData: [
        { blocks: { html: 'some contentssssssssssssssssss', tags: 'h1' } },
      ],
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

export default connect(mapStateToProps)(UserPage)
