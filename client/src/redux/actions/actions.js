import axios from "axios"

export function getCountries() {
    return async function(dispatch) {
        var response = await axios.get("http://localhost:3001/countries")

        return dispatch({
            type: "GET_COUNTRIES",
            payload: response.data
        })
    }
}

export function filterByContinent(payload) {
    return {
        type: "FILTER_BY_CONTINENT",
        payload
    }
}

export function filterByName(payload) {
    return {
        type: "FILTER_BY_NAME",
        payload
    }
}

export function refreshCountries() {
    return {
        type: "REFRESH_COUNTRIES"
    }
}

export function sortByAlph(payload) {
    return {
        type: "SORT_BY_ALPH",
        payload
    }
}

export function sortByPop(payload) {
    return {
        type: "SORT_BY_POP",
        payload
    }
}

export function postActivity(payload) {
    return async function() {
        var response = await axios.post("http://localhost:3001/activity", payload)
        return response
    }
}