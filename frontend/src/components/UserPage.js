import React, { Component } from 'react'
import { connect } from 'react-redux'
import WholePage from './blankpage/WholePage'
import './UserPage.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class UserPage extends Component {
  render() {
    return (
      <>
        <div className='d-flex' id='wrapper'>
          <div className='border-end bg-white' id='sidebar-wrapper'>
            <div className='sidebar-heading border-bottom bg-light'>
              {this.props.googleEmail}
            </div>
            <div className='list-group list-group-flush'>
              <a
                className='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                <FontAwesomeIcon icon={faPlus} /> New Page
              </a>
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
