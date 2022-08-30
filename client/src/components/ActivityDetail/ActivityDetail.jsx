import React from "react"

const ActivityDetail = ({name, duration, difficulty, season}) => {
    return (
        <div className="activity-detail">
            <h2>{name}</h2>
            <p>Duration: {duration}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Season: {season}</p>
        </div>
    )
}

export default ActivityDetail