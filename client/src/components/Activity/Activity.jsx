import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../../redux/actions/actions"


const Activity = () => {

    const allCountries = useSelector(state => state.countries)

    const dispatch = useDispatch()

    useEffect(() => {
        if (allCountries.length < 10) {
            dispatch(getCountries())
        }
    }, [])
    

    const [input, setInput] = useState({
        name: '',
        duration: '',
        difficulty: 1,
        season: 'Summer',
        countries: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeOptions = (e) => {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value] 
        })
    }

    const handleSubmitActivity = (e) => {
        e.preventDefault()
        console.log(input)
    }

    return (
        <div className="activity">
            <button onClick={() => window.history.go(-1)}>Back</button>
            <h2>Create an activity</h2>
            <form onSubmit={(e) => handleSubmitActivity(e)}>
                <label name={'name'}>Name: </label>
                <input type={'text'} name={'name'} value={input.name} onChange={(e) => handleChange(e)} />

                <label name={'duration'}>Duration: </label>
                <input type={'number'} name={'duration'} min={1} onChange={(e) => handleChange(e)} value={input.duration} />

                <label name={'difficulty'}>Difficulty: </label>
                <select name={'difficulty'} onChange={(e) => handleChange(e)}  value={input.difficulty}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>

                <label name={'season'}>Season: </label>
                <select name={'season'} onChange={(e) => handleChange(e)}  value={input.season}>
                    <option>Summer</option>
                    <option>Spring</option>
                    <option>Winter</option>
                    <option>Autumn</option>
                </select>

                <label name={'country'}>Country: </label>
                <select name={'country'} onChange={(e) => handleChangeOptions(e)}  value={input.country}>
                    {allCountries.map(e => <option key={e.name}>{e.name}</option>)}
                </select>

                <button type={'submit'} disabled={input.name.length ? false : true}>Submit</button>
            </form>
            <div className="info-activities">
                <p><strong>Name:</strong> {input.name}</p>
                <p><strong>Duration:</strong> {input.duration}</p>
                <p><strong>Difficulty:</strong> {input.difficulty}</p>
                <p><strong>Season:</strong> {input.season}</p>
                <ul>
                    <strong>Countries:</strong>
                    {input.countries?.map(country => <li key={country}>{country}</li>)}
                </ul>
            </div>
        </div>
    )
}

export default Activity