/* global fetch */
/* eslint-disable better/no-new */
import "isomorphic-fetch"
import {compose, mergeAll} from "ramda"
import {Future, Either} from "ramda-fantasy"
const {Left, Right} = Either

// import {logError} from "utils/browser"
const leftOrRight = response => (response.error ? Left(response.error) : Right(response))

// +++ HELPERS +++//
const defaultFetchOptions = {
  credentials: "include",
}

const jsonFetchOptions = mergeAll([
  defaultFetchOptions,
  {
    headers: {
      "Content-Type": "application/json",
    },
  },
])

// +++ fetchHtml :: URL -> Future Maybe HTML
export const fetchHtml = url =>
  new Future((reject, resolve) =>
    fetch(url, {credentials: "include"})
      .then(r => {
        r.text().then(compose(resolve, leftOrRight))
      })
      .catch(compose(reject, Left))
  )

// +++ fetchJson :: URL -> Future Maybe JSON
export const fetchJson = url =>
  new Future((reject, resolve) =>
    fetch(url, jsonFetchOptions)
      .then(r => {
        r.json().then(compose(resolve, leftOrRight))
      })
      .catch(compose(reject, Left))
  )
