/* eslint-disable better/no-ifs, fp/no-mutation */
import {always, cond, curry, equals, mergeAll, T} from "ramda"

export default component =>
  curry(
    (state = {application: false}, {type, payload}) =>
      (component.props = cond([
        [equals("APPLICATION_LOAD"), always(mergeAll([component.props, {application: payload}]))],
        [T, always(component.props)],
      ])(type))
  )
