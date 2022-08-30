import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, filterByContinent, refreshCountries, sortByAlph, sortByPop, filterByName } from "../../redux/actions/actions"
import { Link } from "react-router-dom"

import Country from "../Country/Country"
import Pages from "../Pages/Pages"

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
        if (allCountries.length < 10) {
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

    const handleContinentFilter = (e) => {
        dispatch(filterByContinent(e.target.value))
        setPage(1)
    }

    const handleRefresh = () => {
        dispatch(refreshCountries())
        setPage(1)
    }

    const handleAlphSort = (e) => {
        dispatch(sortByAlph(e.target.value))
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }

    const handlePopSort = (e) => {
        dispatch(sortByPop(e.target.value))
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }

    return (
        <div className="countries">

            <form className="search" onSubmit={e => handleSubmitSearch(e)}>
                <input onChange={handleChangeSearch} name={'search'} type={'text'} autoComplete={'off'} placeholder={'Search a country'} />
                <button type={'submit'}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>

            <button onClick={() => handleRefresh()}><FontAwesomeIcon icon={faRotate} /></button>

            <div className="side-bar">
                <Link to='/activities'>Create activity</Link>

                <p>Sort by population</p>
                <select defaultValue={'selected'} onChange={e => handlePopSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Select...</option>
                    <option value={'PopAscending'}>Ascending</option>
                    <option value={'PopDescending'}>Descending</option>
                </select>

                <p>Sort by alphabetically</p>
                <select defaultValue={'selected'} onChange={e => handleAlphSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Select...</option>
                    <option value={'Ascending'}>Ascending</option>
                    <option value={'Descending'}>Descending</option>
                </select>

                <p>Filter by continent</p>
                <select defaultValue={'selected'} onChange={e => handleContinentFilter(e)}>
                    <option value={'selected'} disabled={true}>Select...</option>
                    <option value={'Americas'}>Americas</option>
                    <option value={'Asia'}>Asia</option>
                    <option value={'Africa'}>Africa</option>
                    <option value={'Oceania'}>Oceania</option>
                    <option value={'Europe'}>Europe</option>
                </select>
            </div>

            <Pages  allCountries = { allCountries } countriesPerPage = { countriesPerPage } setPage = { setPage }/>
            
            <div className="all-countries">
                {currentCountries?.map(e => {
                    return <Country name = {e.name} img = {e.img} continent = {e.continent} id = {e.id} key = {e.id} />
                })}
            </div>
        </div>
    )
    
}

export default Countries