import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCountries } from "../../redux/actions/actions"

import ActivityDetail from "../ActivityDetail/ActivityDetail"

import "./CountryDetail.css"


const CountryDetail = () => {

    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.allActivities)
    const { countryId } = useParams()
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(getCountries())
        console.log(activities)
    }, [])

    const countryDetail = countries.filter(country => country.id == countryId)

    if (countryDetail.length) {
        return (
            <div className="country-detail">
                <button onClick={() => window.history.go(-1)}>Back</button>
                <div className="detail">
                    <img src={countryDetail[0].img} />
                    <div className="info-detail">
                        <h2>{countryDetail[0].name} ({countryDetail[0].id})</h2>
                        <p>{countryDetail[0].capital}</p>
                        <p>{countryDetail[0].continent} ({countryDetail[0].subregion})</p>
                        <p>Area: {countryDetail[0].area} km2</p>
                        <p>Population: {countryDetail[0].population}</p>
                    </div>
                </div>
                {activities?.map(activity => {
                    return <ActivityDetail name = {activity.name} difficulty = {activity.difficulty} duration = {activity.duration} season = {activity.season} key = {activity.id} />
                })}
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