import React from 'react';
import "./Park.css";

const Park = (props) => {
    return (
        <div className="parkResult">

            {
                props.images.length && <img className="parkImages" src={props.images[0].url} alt={props.images[0].title}/>
            }

            <br/>
            Park Name: {props.fullName}
            <br/>
            Location: {props.location}
            <br/>
            Description: {props.description}
            <br/>
            <a href={props.url} target="_blank" rel="noopener noreferrer">{props.url}</a>

        </div>
    )
}

export default Park;