import React from "react"
import { Link } from "react-router-dom"

import "./Country.css"


const Country = ({ name, img, continent, id }) => {

    return (
        <Link to={'/countries/' + id}>
            <div className="country">
                <h2>{name}</h2>
                <p>{continent}</p>
                <img src={img} alt='' />
            </div>
        </Link>
    )
}

export default Country