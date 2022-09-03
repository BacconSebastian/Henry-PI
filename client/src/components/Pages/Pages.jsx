import React from "react"

import "./Pages.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons"


const Pages = ({ allCountries, countriesPerPage, setPage, page  }) => {

    const numberOfPages = []

    for (let i = 0; i < Math.ceil(allCountries.length/countriesPerPage); i++) {
        numberOfPages.push(i + 1)
    }

    const previousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    
    const nextPage = () => {
        if (page < numberOfPages.length) {
            setPage(page + 1)
        }
    }

    if (numberOfPages.length) {
        return (
            <div className="pages">
                <FontAwesomeIcon icon={faChevronLeft} onClick = {() => previousPage()} className = {page == 1 ? 'disabled' : ''}/>
                {numberOfPages.map(e => {
                    return (
                        <a onClick={ () => setPage(e) } key={e} className = {page == e ? 'active' : ''}>{e}</a>
                    )
                })}
                <FontAwesomeIcon icon={faChevronRight} onClick = {() => nextPage()} className = {page == numberOfPages.length || numberOfPages.length == 0 ? 'disabled' : ''} />
            </div>
        )
    } else {
        return (
            <div className="pages">
            </div>
        )
    }
}

export default Pages