import React from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getCountries } from "../../redux/actions/actions"

import "./Home.css"


const Home = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    return (
        <div className="home">
            <Link to="/countries">Start</Link>
        </div>
    )
}

export default Home