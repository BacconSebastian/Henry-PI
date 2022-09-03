import React from "react"
import { Link } from "react-router-dom"

import "./Home.css"


const Home = () => {

    return (
        <div className="home">
            <Link to="/countries"><h1>COUNTRIES APP</h1></Link>
            <h3>Developed by Sebastian Baccon</h3>
        </div>
    )
}

export default Home