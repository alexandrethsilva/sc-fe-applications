import Rx from "rxjs/Rx"
import {IO} from "ramda-fantasy"

//+++ HELPERS +++//

//++++++++++ select :: Selector -> Maybe DomElement
export const select = selector => {
  if (selector === window) return Just(window)
  if (selector === document) return Just(document)

  const value = document.querySelector(selector)
  return value ? Just(value) : Nothing()
}

//++++++++++ getDom :: Selector -> Maybe IO DomElement
export const getDom = target => IO(() => select(target))

//++++++++++ listen :: a -> b -> EventStream (b, a)
export const listen = flip(Rx.Observable.fromEvent)

//++++++++++ getDataAttribute :: Attribute -> DomElement -> Maybe String
export const getDataAttribute = curry((attribute, element) => {
  const value = element.getAttribute(`data-${attribute}`)
  return value ? Just(value) : Nothing()
})
