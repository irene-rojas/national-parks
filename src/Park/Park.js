import React from 'react';
import "./Park.css";

const Park = (props) => {
    return (
        <div className="parkResult">
            Park Name: {props.fullName}
            <br/>
            Location: {props.location}
            <br/>
            Description: {props.description}

        </div>
    )
}

export default Park;