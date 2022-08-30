const initialState = {
    allCountries: [],
    countries: [],
    allActivities: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_COUNTRIES":

            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        
        case "GET_ACTIVITIES":

            return {
                ...state,
                allActivities: action.payload
            }
        
        case "FILTER_BY_CONTINENT":

            const filteredCountriesByContinent = state.allCountries.filter(country => country.continent == action.payload) 
            
            return {
                ...state,
                countries: filteredCountriesByContinent
            }

        case "FILTER_BY_NAME":

            const filteredCountriesByName = state.allCountries.filter(country => country.name == action.payload) 

            return {
                ...state,
                countries: filteredCountriesByName
            }

        case "REFRESH_COUNTRIES":
            return {
                ...state,
                countries: state.allCountries
            }

        case "SORT_BY_ALPH":

            const sortedCountries = action.payload == "Ascending" ?
                state.countries.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    } else if (b.name > a.name) {
                        return -1
                    } else {
                        return 0
                    }
                })
                :
                state.countries.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    } else if (b.name > a.name) {
                        return 1
                    } else {
                        return 0
                    }
                })

            return {
                ...state,
                countries: sortedCountries
            }
        
        case "SORT_BY_POP":

            const sortedCountriesByPop = action.payload == "PopAscending" ?
                state.countries.sort((a, b) => {
                    if (a.population > b.population) {
                        return 1
                    } else if (b.population > a.population) {
                        return -1
                    } else {
                        return 0
                    }
                })
                :
                state.countries.sort((a, b) => {
                    if (a.population > b.population) {
                        return -1
                    } else if (b.population > a.population) {
                        return 1
                    } else {
                        return 0
                    }
                })

            return {
                ...state,
                countries: sortedCountriesByPop
            }
            
        default:
            return state
    }
}

export default rootReducer