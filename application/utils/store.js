import {curry} from "ramda"

export const dispatchAction = curry((store, type, payload) =>
  store.dispatch({type, payload})
)
