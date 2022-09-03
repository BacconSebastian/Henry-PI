import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, refreshCountries, filterByName } from "../../redux/actions/actions"
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
    const [condition, setCondition] = useState(true)  // To toggle loading
    
    const filterByContinent = document.getElementById('continent-filter')

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
        setCondition(true)
        setTimeout(() => {
            setCondition(false)
        }, 3500)
        dispatch(filterByName(input))
        setInput('')
    }

    const handleRefresh = () => {
        dispatch(refreshCountries())
        filterByContinent.value = 'selected'
        setPage(1)
    }


    return (
        <div className="countries">

            <h1>COUNTRIES APP</h1>

            <Link to='/activities' className="create-activity">¡Create activity!</Link>

            <div className="head-bar">
                <form className="search" onSubmit={e => handleSubmitSearch(e)}>
                    <input onChange={handleChangeSearch} name={'search'} type={'text'} autoComplete={'nope'} placeholder={'Search a country'} value={input} />
                    <button type={'submit'}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>
            </div>

            <button id = {'refresh-button'} className = {allCountries.length > 60 ? 'disabled' : 'enabled'} disabled = {allCountries.length > 60 ? true : false} onClick={() => handleRefresh()}><FontAwesomeIcon icon={faRotate} /></button>

            <Bar setRender = {setRender} setPage = {setPage} allCountries = {allCountries} setCondition = {setCondition} />

            <div className="all-countries">
                {allCountries.length ?
                    currentCountries.map(e => {
                        return <Country name = {e.name} img = {e.image} continent = {e.continent} id = {e.id} key = {e.id} />
                    })
                    :

                    condition ? 
                    <svg viewBox="0 0 50 50">
                        <circle class="ring" cx="25" cy="25" r="20"></circle>
                        <circle class="ball" cx="25" cy="5" r="3.5"></circle>
                    </svg>
                    :
                    <p className="does-not-found">Countries does not found :(</p>
                }
            </div>
            
            <Pages  allCountries = { allCountries } countriesPerPage = { countriesPerPage } setPage = { setPage } page = { page } />
        </div>
    )
}

export default Countries