import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { filterByContinent, refreshCountries, sortByAlph, sortByPop } from "../../redux/actions/actions"

import "./Bar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotate } from "@fortawesome/free-solid-svg-icons"


const Bar = ({ setRender, setPage, allCountries }) => {

    const dispatch = useDispatch()

    const popSort = document.getElementById('pop-sort')
    const alphSort = document.getElementById('alph-sort')
    const continentFilter = document.getElementById('continent-filter')

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
        popSort.value = 'selected'
        continentFilter.value = 'selected'
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }

    const handlePopSort = (e) => {
        dispatch(sortByPop(e.target.value))
        alphSort.value = 'selected'
        continentFilter.value = 'selected'
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }


    return (
        <div className="bar">
            <div className="input-sort">
                <label name={'pop-sort'}>Sort by population:</label>
                <select id={'pop-sort'} name={'pop-sort'} defaultValue={'selected'} onChange={e => handlePopSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Select...</option>
                    <option value={'PopAscending'}>Ascending</option>
                    <option value={'PopDescending'}>Descending</option>
                </select>
            </div>

            <div className="input-sort">
                <label name={'alph-sort'}>Sort by alphabetically:</label>
                <select id={'alph-sort'} name={'alph-sort'} defaultValue={'selected'} onChange={e => handleAlphSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Select...</option>
                    <option value={'Ascending'}>Ascending</option>
                    <option value={'Descending'}>Descending</option>
                </select>
            </div>

            <div className="input-sort">
                <label name={'continent-filter'}>Filter by continent:</label>
                <select id={'continent-filter'} name={'continent-filter'} defaultValue={'selected'} onChange={e => handleContinentFilter(e)}>
                    <option value={'selected'} disabled={true}>Select...</option>
                    <option value={'Americas'}>Americas</option>
                    <option value={'Asia'}>Asia</option>
                    <option value={'Africa'}>Africa</option>
                    <option value={'Oceania'}>Oceania</option>
                    <option value={'Europe'}>Europe</option>
                </select>
            </div>

            <button disabled = {allCountries.length > 60 ? true : false} onClick={() => handleRefresh()}><FontAwesomeIcon icon={faRotate} /></button>
        </div>
    )
    
}

export default Bar