import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, filterByContinent, refreshCountries, sortByAlph, sortByPop, filterByName } from "../../redux/actions/actions"
import { Link } from "react-router-dom"

import Country from "../Country/Country"
import Pages from "../Pages/Pages"
import Bar from "../Bar/Bar"

import "./Countries.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotate, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


const Countries = () => {

    const allCountries = useSelector(state => state.countries)
    const dispatch = useDispatch()

    const [input, setInput] = useState('')
    const [page, setPage] = useState(1)
    const [render, setRender] = useState('') // To render page

    const countriesPerPage = 10
    const indexLastCountry = page * countriesPerPage // Number of pages
    const indexFirstCountry = indexLastCountry - countriesPerPage // Number of pages
    const currentCountries = allCountries.slice(indexFirstCountry, indexLastCountry)

    useEffect(() => {
        if (allCountries.length < 2) {
            dispatch(getCountries())
        }
    }, [])

    const handleChangeSearch = (e) => {
        setInput(e.target.value)
    }
    
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        dispatch(filterByName(input))
    }


    return (
        <div className="countries">

            <form className="search" onSubmit={e => handleSubmitSearch(e)}>
                <input onChange={handleChangeSearch} name={'search'} type={'text'} autoComplete={'nope'} placeholder={'Search a country'} />
                <button type={'submit'}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>

            <Link to='/activities'>Create activity</Link>

            <Bar setRender = {setRender} setPage = {setPage} allCountries = {allCountries} />

            <Pages  allCountries = { allCountries } countriesPerPage = { countriesPerPage } setPage = { setPage } page = { page } />
            
            <div className="all-countries">
                {allCountries.length ?
                    currentCountries.map(e => {
                        return <Country name = {e.name} img = {e.image} continent = {e.continent} id = {e.id} key = {e.id} />
                    })
                    :
                    <p>Loading...</p>
                }
            </div>
        </div>
    )
    
}

export default Countries