/*global localStorage*/
import {compose, curry, is, isArrayLike, isNil} from "ramda"
import {Task} from "ramda-fantasy"

//+++ HELPERS +++//
const setLocalStorageItem = curry(localStorage.setItem.bind(localStorage))
// const setSessionStorageItem = curry(sessionStorage.setItem.bind(sessionStorage))

//+++ PURE +++//

//++++++++++ log :: Value -> IO Value
export const logConsole = _ => {
  console.log(_) // eslint-disable-line no-console
  return _
}

//++++++++++ table :: Value -> IO Value
export const logTable = value => {
  console.table(value) // eslint-disable-line no-console
  return value
}

//++++++++++ log :: String -> IO String
export const logError = value => {
  console.error(value) // eslint-disable-line no-console
  return value
}

//++++++++++ fromLocalStorage :: String -> Maybe LocalStorageIO
export const fromLocalStorage = key =>
  new Task((fail, resolve) => {
    const value = JSON.parse(localStorage.getItem(key))
    return value ? resolve(value) : fail(key)
  })

//+++ prepareForStorage :: Value -> Task ParsedValue
const prepareForStorage = value =>
  new Task((fail, resolve) => {
    if (isNil(value))
      return fail("Attempting to save a null value? This is a no-op.")
    if (isArrayLike(value)) return resolve(JSON.stringify(value))
    if (is(Object, value)) return resolve(JSON.stringify(value))
    return resolve(value)
  })

//+++ IMPURE +++//

//++++++++++ toLocalStorage :: String -> Any -> Either ErrorLog LocalStorageIO
export const toLocalStorage = curry((key, content) => {
  prepareForStorage(content).fork(log, setLocalStorageItem(key))
  return content
})
