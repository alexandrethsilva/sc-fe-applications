import {API_ENDPOINT} from "constants"
import {fetchJson} from "utils/http"
import {curry, filter, map} from "ramda"

const applicationsByStage = curry(
  (requestedStage, {application_stage: stage}) => requestedStage === stage
)

export const loadApplicationList = () => fetchJson(`${API_ENDPOINT}/applications`)

export const loadApplicationListByStage = stage =>
  fetchJson(`${API_ENDPOINT}/applications`).map(map(filter(applicationsByStage(stage))))
