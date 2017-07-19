import {h} from "skatejs"
import css from "./application.css"

import {identity, map} from "ramda"

const Empty = message =>
  <div class="application-container">
    <div className="application-body">
      {message}
    </div>
  </div>

const Content = d =>
  <div class="application-container">
    <div className="application-body">
      <div className="application-client">
        <h3>
          {
            d.application_client.application_client_company
              .application_client_company_name
          }
        </h3>
        <strong>Represented through</strong>{" "}
        {d.application_client.application_client_name_first}{" "}
        {d.application_client.application_client_name_last} ({d.application_client.application_client_email})
      </div>
      <div className="application-details">
        <strong>Amount</strong> {d.application_amount} ({d.application_stage})
      </div>
    </div>
  </div>

const Application = ({application}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    !application
      ? Empty("Loading content...")
      : application.bimap(Empty, Content).chain(identity),
  ])

export const ApplicationList = ({applicationList}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    !applicationList
      ? Empty("Loading content...")
      : applicationList.bimap(Empty, map(Content)).chain(identity),
  ])

export default Application
