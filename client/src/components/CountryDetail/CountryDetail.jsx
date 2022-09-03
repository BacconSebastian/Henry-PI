import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { getCountries } from "../../redux/actions/actions"

import ActivityDetail from "../ActivityDetail/ActivityDetail"

import "./CountryDetail.css"


const CountryDetail = () => {

    const countries = useSelector(state => state.countries)
    const { countryId } = useParams()
    const dispatch = useDispatch()

    const countryDetail = countries.filter(country => country.id == countryId)

    useEffect( () => {
        if (countries.length < 2) {
            dispatch(getCountries())
        }
    }, [])

    if (countryDetail.length) {
        return (
            <div className="country-detail">
                <button onClick={() => window.history.go(-1)}>Back</button>
                <div className="detail">
                    <img src={countryDetail[0].image} />
                    <div className="info-detail">
                        <h2>{countryDetail[0].name} ({countryDetail[0].id})</h2>
                        <p>{countryDetail[0].capital}</p>
                        <p>{countryDetail[0].continent} ({countryDetail[0].subregion})</p>
                        <p>Area: {countryDetail[0].area} km2</p>
                        <p>Population: {countryDetail[0].population}</p>
                    </div>
                </div>
                <div className="activities">
                    <h2>ACTIVITIES</h2>
                    {countryDetail[0].activities.length ? 
                        countryDetail[0].activities.map(activity => {
                            return <ActivityDetail name = {activity.name} difficulty = {activity.difficulty} duration = {activity.duration} season = {activity.season} key = {activity.name} />
                        })
                        :
                        <div className="have-no-activities">
                            <p>This country has no activities yet</p>
                            <Link to='/activities'>¡Create activity!</Link>
                        </div>
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div class="loading-detail">
                <svg viewBox="0 0 50 50">
                    <circle class="ring" cx="25" cy="25" r="20"></circle>
                    <circle class="ball" cx="25" cy="5" r="3.5"></circle>
                </svg>
            </div>
        )
    }
}

export default CountryDetail