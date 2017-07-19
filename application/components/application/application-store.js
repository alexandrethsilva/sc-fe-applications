/* eslint-disable better/no-ifs, fp/no-mutation */
import {always, cond, curry, equals, T} from "ramda"

export default component =>
  curry((state = {application: false}, {type, payload}) => {
    return (component.props = cond([
      [
        equals("APPLICATION_LOAD"),
        always(
          Object.assign({}, component.props, {
            application: payload,
          })
        ),
      ],
      [T, always(component.props)],
    ])(type))
  })
