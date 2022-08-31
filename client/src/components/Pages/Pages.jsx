import React, { useEffect } from "react"

import "./Pages.css"


const Pages = ({ allCountries, countriesPerPage, setPage, page  }) => {

    const numberOfPages = []

    for (let i = 1; i < Math.ceil(allCountries.length/countriesPerPage); i++) {
        numberOfPages.push(i)
    }

    return (
        <div className="pages">
            {numberOfPages.map(e => {
                return (
                    <a onClick={ () => setPage(e) } key={e} className = {page == e ? 'active' : ''}>{e}</a>
                )
            })}
        </div>
    )
}

export default Pages