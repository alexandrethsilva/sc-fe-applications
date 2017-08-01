/* eslint-disable fp/no-class, fp/no-this, fp/no-mutation, fp/no-unused-expression, better/explicit-return */
// import "@skatejs/web-components/es/native-shim"

import {createStore} from "redux"
import {Component, define} from "skatejs"

import {dispatchAction} from "utils/store"

import {ApplicationList} from "./application-template"
import {loadApplicationListByStage} from "./applicationList-api"
import ApplicationListStore from "./applicationList-store"

// +++ COMPONENT +++//
class ApplicationListComponent extends Component {
  static get is() {
    return "sc-application-list"
  }
  static get props() {
    return {
      stage: {attribute: true},
      applicationList: {attribute: false},
    }
  }

  // eslint-disable-next-line fp/no-nil
  constructor() {
    super()
    this.store = createStore(ApplicationListStore(this))
    this.dispatchApplicationListLoad = dispatchAction(this.store, "APPLICATION_LIST_LOAD")
  }

  // eslint-disable-next-line fp/no-nil
  connectedCallback() {
    super.connectedCallback()

    loadApplicationListByStage(this.props.stage).fork(
      this.dispatchApplicationListLoad,
      this.dispatchApplicationListLoad
    )
  }

  // eslint-disable-next-line fp/no-nil
  disconnectedCallback() {
    super.disconnectedCallback()
  }

  // eslint-disable-next-line fp/no-nil
  attributeChangedCallback(attribute, previous, next) {
    super.attributeChangedCallback(attribute, previous, next)

    // eslint-disable-next-line better/no-ifs
    if (attribute === "stage" && previous !== null && previous !== next) {
      loadApplicationListByStage(this.props.stage).fork(
        this.dispatchApplicationListLoad,
        this.dispatchApplicationListLoad
      )
    }
  }

  renderCallback() {
    return ApplicationList(this)
  }
}

define(ApplicationListComponent)
