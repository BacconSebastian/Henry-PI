import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, postActivity } from "../../redux/actions/actions"

import './Activity.css'


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
        difficulty: 0,
        season: 'select',
        countries: []
    })

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeOptions = (e) => {
        if (input.countries.length < 20) {
            setInput({
                ...input,
                countries: [...input.countries, e.target.value] 
            })
        }
    }

    const handleSubmitActivity = (e) => {
        e.preventDefault()
        dispatch(postActivity(input))
        dispatch(getCountries())
        alert('Activity created')
        window.history.go(-1)
    }

    const disableTest = () => {
        if (input.name.length > 2 &&
            input.duration >= 10 &&
            input.difficulty > 0 &&
            input.season !== 'select' &&
            input.countries.length) 
        {
            return false
        } else {
            return true
        }
    }

    return (
        <div className="activity">
            <button className="back-button" onClick={() => window.history.go(-1)}>Back</button>

            <h2>Create an activity</h2>

            <div className="form-flex">
                <form onSubmit={(e) => handleSubmitActivity(e)}>

                    <input type={'text'} name={'name'} value={input.name} autoComplete={'nope'} placeholder={'Activity name...'} onChange={(e) => handleChange(e)} />

                    <input type={'number'} name={'duration'} step={10} min={10} autoComplete={'nope'} placeholder={'Activity duration (minutes)...'} onChange={(e) => handleChange(e)} value={input.duration} />

                    <select name={'difficulty'} onChange={(e) => handleChange(e)} value={input.difficulty} defaultValue={0} >
                        <option value={0} disabled={true}>Select difficulty...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>


                    <select name={'season'} onChange={(e) => handleChange(e)}  value={input.season} defaultValue={'select'} >
                        <option value={'select'} disabled={true}>Select season...</option>
                        <option>Summer</option>
                        <option>Spring</option>
                        <option>Winter</option>
                        <option>Autumn</option>
                    </select>

                    <select name={'country'} onChange={(e) => handleChangeOptions(e)} value={input.country} defaultValue={'select'} >
                        <option value={'select'} disabled={true}>Select countries...</option>
                        {allCountries.map(e => <option value={e.id} key={e.name}>{e.name}</option>)}
                    </select>

                    <button type={'submit'} className = {disableTest() ? 'disabled' : 'enabled'} disabled={disableTest() ? true : false}>Create Activity</button>
                    </form>

                    <div className="info-activities">
                    <p><strong>Name:</strong> {input.name}</p>
                    <p><strong>Duration:</strong> {input.duration < 10 ? '' : input.duration}</p>
                    <p><strong>Difficulty:</strong> {input.difficulty !== 0 ? input.difficulty : ''}</p>
                    <p><strong>Season:</strong> {input.season !== 'select' ? input.season : ''}</p>
                    <ul>
                        <strong>Countries:</strong>
                        {input.countries?.map(country => <li key={country}>{country}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Activity