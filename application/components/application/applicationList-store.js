/* eslint-disable better/no-ifs, fp/no-mutation */
import {always, cond, curry, equals, mergeAll, T} from "ramda"

export default component =>
  curry(
    (state = {applicationList: false}, {type, payload}) =>
      (component.props = cond([
        [
          equals("APPLICATION_LIST_LOAD"),
          always(mergeAll([component.props, {applicationList: payload}])),
        ],
        [T, always(component.props)],
      ])(type))
  )
