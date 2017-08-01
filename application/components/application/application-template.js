/* eslint-disable camelcase */
import {h} from "skatejs"
import css from "./application.css"

import {is, isNil, map} from "ramda"

const Empty = content =>
  <div class="application-container">
    <div className="application-body">
      {is(Error, content) ? content.message : content}
    </div>
  </div>

const Content = ({
  application_client: {
    application_client_company: {application_client_company_name},
    application_client_name_first,
    application_client_name_last,
    application_client_email,
  },
  application_amount,
  application_stage,
}) =>
  <div class="application-container">
    <div className="application-body">
      <div className="application-client">
        <h3>{application_client_company_name}</h3>
        <strong>Represented through</strong> {application_client_name_first}{" "}
        {application_client_name_last} ({application_client_email})
      </div>
      <div className="application-details">
        <strong>Amount</strong> {application_amount} ({application_stage})
      </div>
    </div>
  </div>

const Application = ({application}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    isNil(application) ? Empty("Loading content...") : application.either(Empty, Content),
  ])

export const ApplicationList = ({applicationList}) =>
  h("div", false, [
    <style>
      {css}
    </style>,
    isNil(applicationList)
      ? Empty("Loading content...")
      : applicationList.either(Empty, map(Content)),
  ])

export default Application
