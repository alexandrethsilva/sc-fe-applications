import "@skatejs/web-components"
import {createStore} from "redux"
import {Component, define} from "skatejs"

import {dispatchAction} from "utils/store"
import {logError, logConsole} from "utils/browser"

import {ApplicationList} from "./application-template"
import {loadApplicationListByType} from "./application-api"
import ApplicationStore from "./application-store"

import {compose, prop} from "ramda"

//+++ COMPONENT +++//
class ApplicationListComponent extends Component {
  static get is() {
    return "sc-application-list"
  }
  static get props() {
    return {
      id: {attribute: true},
      type: {attribute: true},
      applicationList: {attribute: true},
    }
  }

  constructor() {
    super()
    this.store = createStore(ApplicationStore(this))
    this.dispatchApplicationListLoad = dispatchAction(
      this.store,
      "APPLICATIONLIST_LOAD"
    )
  }

  connectedCallback() {
    super.connectedCallback()
    loadApplicationListByType(this.props.type).fork(
      logError,
      this.dispatchApplicationListLoad
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  attributeChangedCallback(attribute, previous, next) {
    super.attributeChangedCallback(attribute, previous, next)

    if (attribute === "type" && previous !== null && previous !== next) {
      loadApplicationListByType(this.props.type).fork(
        logError,
        this.dispatchApplicationListLoad
      )
    }
  }

  renderCallback() {
    return ApplicationList(this)
  }
}

define(ApplicationListComponent)
