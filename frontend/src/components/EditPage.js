import React, { Component } from 'react'
import { connect } from 'react-redux'
import EditBlock from './EditBlock'
class EditPage extends Component {
  renderBlocks() {
    return this.props.blocks.map((block) => {
      return (
        <EditBlock
          tagName={block.tagName} // Cnn change the tag name
          html={block.html}
          key={block.id}
          id={block.id}
          placeHolderMsg={block.id}
        />
      )
    })
  }
  render() {
    return <>{this.renderBlocks()}</>
  }
}
const mapStateToProps = (state) => {
  return { blocks: Object.values(state.blocks) }
}

export default connect(mapStateToProps)(EditPage)
