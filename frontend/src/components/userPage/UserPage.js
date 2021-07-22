import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPages, fetchPages, deletePage, clearBlock } from '../../actions'
import EditPage from '../blankpage/EditPage'
import './UserPage.css'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { nanoid } from 'nanoid'

class UserPage extends Component {
  async componentDidMount() {
    await this.props.fetchPages()
  }
  onSubmit = () => {
    const data = {
      pageData: {
        id: nanoid(),
        html: 'UNTITLED',
        tagName: 'h1',
        placeHolderMsg: 'Header 1',
      },
      title: 'UNTITLED',
      googleEmail: this.props.googleEmail,
    }
    this.props.createPages(data)
  }

  onDelete = (id) => {
    this.props.deletePage(id)
  }
  renderTitle = () => {
    const userData = this.props.pages.filter(
      (page) => page.googleEmail === this.props.googleEmail
    )
    return userData.map((page) => {
      return (
        <Link
          key={page._id}
          to={`/${page._id}`}
          className='list-group-item list-group-item-action list-group-item-light p-3'
        >
          {page.pageData['0'].html}
          <span
            onClick={() => {
              this.props.deletePage(page._id)
              this.props.clearBlock()
              window.location.reload()
            }}
          >
            <FontAwesomeIcon
              style={{ marginLeft: '15px', fontSize: '1rem' }}
              icon={faTrash}
            />
          </span>
        </Link>
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
            <EditPage {...this.props} />
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    blocks: state.blocks,
    googleEmail: state.auth.googleEmail,
    pages: Object.values(state.pages),
  }
}

export default connect(mapStateToProps, {
  createPages,
  fetchPages,
  deletePage,
  clearBlock,
})(UserPage)
