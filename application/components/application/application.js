/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */
import "@skatejs/web-components"
import {createStore} from "redux"
import {Component, define} from "skatejs"

import {dispatchAction} from "utils/store"
import {logError} from "utils/browser"

import Application from "./application-template"
import {loadApplication} from "./application-api"
import ApplicationStore from "./application-store"

// +++ COMPONENT +++//
class ApplicationComponent extends Component {
  static get is() {
    return "sc-application"
  }
  static get props() {
    return {
      id: {attribute: true},
      application: {attribute: false},
    }
  }

  constructor() {
    super()

    this.store = createStore(ApplicationStore(this))

    this.dispatchApplicationLoad = dispatchAction(
      this.store,
      "APPLICATION_LOAD"
    )
  }

  connectedCallback() {
    super.connectedCallback()
    loadApplication(this.props.id).fork(logError, this.dispatchApplicationLoad)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
  }

  attributeChangedCallback(attribute, previous, next) {
    super.attributeChangedCallback(attribute, previous, next)

    if (attribute === "id" && previous !== null && previous !== next) {
      loadApplication(next).fork(logError, this.dispatchApplicationLoad)
    }
  }

  renderCallback() {
    return Application(this)
  }
}

define(ApplicationComponent)
