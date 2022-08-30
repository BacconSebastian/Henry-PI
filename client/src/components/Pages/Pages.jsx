import React from "react"

import "./Pages.css"


const Pages = ({ allCountries, countriesPerPage, setPage  }) => {

    const numberOfPages = [] 

    for (let i = 1; i < Math.ceil(allCountries.length/countriesPerPage); i++) {
        numberOfPages.push(i)
    }

    return (
        <div className="pages">
            {numberOfPages.map(e => {
                return (
                    <a onClick={ () => setPage(e) } key={e} id={e}>{e}</a>
                )
            })}
        </div>
    )
}

export default Pages