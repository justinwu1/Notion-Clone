import React, { Component } from 'react'
import WholeBlock from './WholeBlock'
import './Sidepanel.css'
export default class Sidepanel extends Component {
  render() {
    return (
      <>
        <div class='d-flex' id='wrapper'>
          <div class='border-end bg-white' id='sidebar-wrapper'>
            <div class='sidebar-heading border-bottom bg-light'>
              Start Bootstrap
            </div>
            <div class='list-group list-group-flush'>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Dashboard
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Shortcuts
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Overview
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Events
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Profile
              </a>
              <a
                class='list-group-item list-group-item-action list-group-item-light p-3'
                href='#!'
              >
                Status
              </a>
            </div>
          </div>

          <div id='page-content-wrapper'>
            <WholeBlock />
          </div>
        </div>
      </>
    )
  }
}
