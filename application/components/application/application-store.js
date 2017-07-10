import {isNil} from "ramda"

export default component => (state, {type, payload}) => {
  if (isNil(state))
    return {
      application: null,
      applicationList: null,
    }

  switch (type) {
    case "APPLICATION_LOAD":
      return (component.props = Object.assign({}, component.props, {
        application: payload,
      }))
    case "APPLICATIONLIST_LOAD":
      return (component.props = Object.assign({}, component.props, {
        applicationList: payload,
      }))
    default:
      console.error("A specific action must be dispatched")
      return component.props
  }
}
