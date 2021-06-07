import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { addBlock } from '../actions/index'
import { connect } from 'react-redux'
class DropdownMenu extends Component {
  menuClickHandler = (event) => {
    event.preventDefault()
    this.props.addBlock({
      id: this.props.id,
      ref: this.props.blockRef.current,
      tag: event.target.outerText,
    })
  }
  renderMenu = () => {
    const tags = ['Heading 1', 'Heading 2', 'Heading 3', 'Paragraph']
    return tags.map((tag) => {
      return (
        <button
          onClick={this.menuClickHandler}
          className='dropdown-item'
          key={Math.floor(Math.random() * 9999)}
        >
          {tag}
        </button>
      )
    })
  }
  render() {
    return (
      <div
        style={{ display: 'inline-block', marginRight: '0.5rem' }}
        className='dropdown'
      >
        <button
          className='btn btn-outline-secondary btn-sm'
          type='button'
          id='dropdownMenuButton'
          data-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
          {this.renderMenu()}
        </div>
      </div>
    )
  }
}
export default connect(null, { addBlock })(DropdownMenu)
