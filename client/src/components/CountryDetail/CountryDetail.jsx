import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getCountries } from "../../redux/actions/actions"

import "./CountryDetail.css"


const CountryDetail = () => {

    const countries = useSelector(state => state.countries)
    const { countryId } = useParams()
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCountries())
    }, [])

    const countryDetail = countries.filter(country => country.id == countryId)

    if (countryDetail.length) {
        return (
            <div className="country-detail">
            <button onClick={() => window.history.go(-1)}>Back</button>
                <img src={countryDetail[0].img} />
                <div className="info-detail">
                    <h2>{countryDetail[0].name} ({countryDetail[0].id})</h2>
                    <p>{countryDetail[0].capital}</p>
                    <p>{countryDetail[0].continent} ({countryDetail[0].subregion})</p>
                    <p>Area: {countryDetail[0].area} km2</p>
                    <p>Population: {countryDetail[0].population}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div className="loading-detail">
                Loading...
            </div>
        )
    }
}

export default CountryDetail