/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */
import "@skatejs/web-components"
import {createStore} from "redux"
import {Component, define} from "skatejs"

import {dispatchAction} from "utils/store"
import {logError} from "utils/browser"

import {ApplicationList} from "./application-template"
import {loadApplicationListByType} from "./application-api"
import ApplicationListStore from "./applicationList-store"

// +++ COMPONENT +++//
class ApplicationListComponent extends Component {
  static get is() {
    return "sc-application-list"
  }
  static get props() {
    return {
      type: {attribute: true},
      applicationList: {attribute: false},
    }
  }

  constructor() {
    super()

    this.store = createStore(ApplicationListStore(this))

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
