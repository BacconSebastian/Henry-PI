import React from "react"
import { useDispatch } from "react-redux"
import { filterByContinent, filterByActivity, sortByAlph, sortByPop } from "../../redux/actions/actions"

import "./Bar.css"


const Bar = ({ setRender, setPage, setCondition }) => {

    const dispatch = useDispatch()

    const popSort = document.getElementById('pop-sort')
    const alphSort = document.getElementById('alph-sort')
    const activityFilter = document.getElementById('activity-filter')
    const continentFilter = document.getElementById('continent-filter')

    const handleContinentFilter = (e) => {
        activityFilter.value = 'selected'
        dispatch(filterByContinent(e.target.value))
        setPage(1)
    }

    const handleActivityFilter = (e) => {
        continentFilter.value = 'selected'
        dispatch(filterByActivity(e.target.value))
        setCondition(true)
        setTimeout(() => {
            setCondition(false)
        }, 3500)
        setPage(1)
    }

    const handleAlphSort = (e) => {
        dispatch(sortByAlph(e.target.value))
        popSort.value = 'selected'
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }

    const handlePopSort = (e) => {
        dispatch(sortByPop(e.target.value))
        alphSort.value = 'selected'
        setPage(1)
        setRender('Sort by ' + e.target.value) // To render page
    }

    


    return (
        <div className="bar">
            <div className="input-sort">
                <select id={'pop-sort'} defaultValue={'selected'} onChange={e => handlePopSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Sort by population</option>
                    <option value={'PopAscending'}>Ascending</option>
                    <option value={'PopDescending'}>Descending</option>
                </select>
            </div>

            <div className="input-sort">
                <select id={'alph-sort'} defaultValue={'selected'} onChange={e => handleAlphSort(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Sort by alphabet</option>
                    <option value={'Ascending'}>Ascending</option>
                    <option value={'Descending'}>Descending</option>
                </select>
            </div>

            <div className="input-sort">
                <select id={'continent-filter'} defaultValue={'selected'} onChange={e => handleContinentFilter(e)}>
                    <option value={'selected'} disabled={true}>Filter by continent</option>
                    <option value={'Americas'}>Americas</option>
                    <option value={'Asia'}>Asia</option>
                    <option value={'Africa'}>Africa</option>
                    <option value={'Oceania'}>Oceania</option>
                    <option value={'Europe'}>Europe</option>
                </select>
            </div>

            <div className="input-sort">
                <select id={'activity-filter'} defaultValue={'selected'} onChange={e => handleActivityFilter(e)}>
                    <option value={'selected'} defaultChecked={true} disabled={true}>Filter by activity</option>
                    <option value={'Yes'}>Have activities</option>
                </select>
            </div>
        </div>
    )
    
}

export default Bar