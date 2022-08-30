import React from "react"
import { Link } from "react-router-dom"

import "./Country.css"


const Country = ({ name, img, continent, id }) => {

    return (
        <div className="country">
            <Link to={'/countries/' + id}><h2>{name}</h2></Link>
            <p>{continent}</p>
            <img src={img} alt='' />
        </div>
    )
}

export default Country