import {API_ENDPOINT} from "constants"
import {fetchJson} from "utils/http"

export const loadApplication = id => fetchJson(`${API_ENDPOINT}/applications/${id}`)
