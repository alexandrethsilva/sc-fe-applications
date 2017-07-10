import {API_ENDPOINT} from "../../constants"
import {fetchJson} from "../../utils/http"
import {logTable} from "../../utils/browser"

import {curry, map, filter} from "ramda"
import {Either} from "ramda-fantasy"
const {Left, Right} = Either

const applicationsByType = curry(
  (type, {application_stage}) => type === application_stage
)

export const loadApplication = id =>
  fetchJson(`${API_ENDPOINT}/applications/${id}`).map(
    r => (r.error ? Left(r.error) : Right(r))
  )

export const loadApplicationList = () =>
  fetchJson(`${API_ENDPOINT}/applications`).map(
    r => (r.error ? Left(r.error) : Right(r))
  )

export const loadApplicationListByType = type =>
  fetchJson(`${API_ENDPOINT}/applications`)
    .map(filter(applicationsByType(type)))
    .map(r => (r.error ? Left(r.error) : Right(r)))
