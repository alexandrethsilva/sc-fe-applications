import "isomorphic-fetch"
import {Future} from "ramda-fantasy"

//+++ HELPERS +++//
const defaultFetchOptions = {
  credentials: "include",
}

const jsonFetchOptions = Object.assign({}, defaultFetchOptions, {
  headers: {
    "Content-Type": "application/json",
  },
})

//+++ fetchHtml :: URL -> Future HTML
export const fetchHtml = url =>
  new Future((fail, resolve) =>
    fetch(url, {credentials: "include"})
      .then(res => {
        res.text().then(resolve)
      })
      .catch(fail)
  )

//+++ fetchJson :: URL -> Future JSON
export const fetchJson = url =>
  new Future((fail, resolve) =>
    fetch(url, jsonFetchOptions)
      .then(res => {
        res.json().then(resolve)
      })
      .catch(fail)
  )
