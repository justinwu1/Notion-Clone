import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'
export default class EditBlock extends Component {
  constructor() {
    super()
    this.contentEditable = React.createRef()
    this.state = { html: '' }
  }
  handleChange = (evt) => {
    this.setState({ html: evt.target.value })
  }
  render() {
    return (
      <>
        <ContentEditable
          innerRef={this.contentEditable}
          html={this.state.html} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={this.handleChange} // handle innerHTML change
          tagName='article' // Use a custom HTML tag (uses a div by default)
          placeholder={`Type '/' for commands`}
        />
      </>
    )
  }
}
