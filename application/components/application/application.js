/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */
// import "@skatejs/web-components/es/native-shim"

import {createStore} from "redux"
import {Component, define} from "skatejs"

import {dispatchAction} from "utils/store"
// import {logError} from "utils/browser"

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

  // eslint-disable-next-line fp/no-nil
  constructor() {
    super()
    this.store = createStore(ApplicationStore(this))
    this.dispatchApplicationLoad = dispatchAction(this.store, "APPLICATION_LOAD")
  }

  // eslint-disable-next-line fp/no-nil
  connectedCallback() {
    super.connectedCallback()
    loadApplication(this.props.id).fork(this.dispatchApplicationLoad, this.dispatchApplicationLoad)
  }

  // eslint-disable-next-line fp/no-nil
  disconnectedCallback() {
    super.disconnectedCallback()
  }

  // eslint-disable-next-line fp/no-nil
  attributeChangedCallback(attribute, previous, next) {
    super.attributeChangedCallback(attribute, previous, next)

    // eslint-disable-next-line better/no-ifs
    if (attribute === "id" && previous !== null && previous !== next) {
      loadApplication(next).fork(this.dispatchApplicationLoad, this.dispatchApplicationLoad)
    }
  }

  renderCallback() {
    return Application(this)
  }
}

define(ApplicationComponent)
