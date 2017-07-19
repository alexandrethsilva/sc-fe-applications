/* eslint-disable better/no-ifs, fp/no-mutation */
import {always, cond, curry, equals, T} from "ramda"

export default component =>
  curry(
    (state = {applicationList: false}, {type, payload}) =>
      (component.props = cond([
        [
          equals("APPLICATIONLIST_LOAD"),
          always(
            Object.assign({}, component.props, {
              applicationList: payload,
            })
          ),
        ],
        [T, always(component.props)],
      ])(type))
  )
