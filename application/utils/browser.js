/* global localStorage */
import {define} from "skatejs"
import {all, always, any, compose, cond, curry, is, isArrayLike, isNil, not, T} from "ramda"
import {Future} from "ramda-fantasy"

// +++ HELPERS +++//
const setLocalStorageItem = curry(localStorage.setItem.bind(localStorage))
// const setSessionStorageItem = curry(sessionStorage.setItem.bind(sessionStorage))

// +++ PURE +++//

// ++++++++++ log :: Value -> IO Value
export const clearConsole = _ => {
  // eslint-disable-next-line fp/no-unused-expression
  console.clear()
  return _
}

// ++++++++++ log :: Value -> IO Value
export const logConsole = _ => {
  // eslint-disable-next-line fp/no-unused-expression
  console.log(_)
  return _
}

// ++++++++++ table :: Value -> IO Value
export const logTable = value => {
  // eslint-disable-next-line fp/no-unused-expression
  console.table(value)
  return value
}

// ++++++++++ log :: String -> IO String
export const logError = value => {
  // eslint-disable-next-line fp/no-unused-expression
  console.error(value)
  return value
}

// ++++++++++ fromLocalStorage :: String -> Maybe LocalStorageIO
export const fromLocalStorage = key =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) => {
    const value = JSON.parse(localStorage.getItem(key))
    return value ? resolve(value) : reject(key)
  })

// +++ prepareForStorage :: Value -> Future ParsedValue
const prepareForStorage = value =>
  // eslint-disable-next-line better/no-new
  new Future((reject, resolve) =>
    cond([
      [any([is(Object), isArrayLike]), always(compose(resolve, JSON.stringify))],
      [isNil, always(reject("Attempting to save a null value? This is a no-op."))],
      [T, always(resolve)],
    ])
  )

// +++ IMPURE +++//

// ++++++++++ toLocalStorage :: String -> Any -> Either ErrorLog LocalStorageIO
export const toLocalStorage = curry((key, content) => {
  // eslint-disable-next-line fp/no-unused-expression
  prepareForStorage(content).fork(logConsole, setLocalStorageItem(key))
  return content
})

export const installCE = curry(
  (environment, component) =>
    // eslint-disable-next-line better/no-new
    new Promise((resolve, reject) =>
      cond([[all([not(isNil), isNil(environment.get(component.is))]), always(define(component))]])(
        environment
      )
    )
)
