import React from 'react';
import "./Park.css";

const Park = (props) => {
    return (
        <div className="parkResult">

            {/* conditional rending here? if photo undefined, still show rest of info */}
            <img className="parkImages" src={props.src} alt={props.title}/>

            <br/>
            Park Name: {props.fullName}
            <br/>
            Location: {props.location}
            <br/>
            Description: {props.description}
            <br/>
            URL: <a href={props.url} target="_blank" rel="noopener noreferrer">{props.url}</a>
            <br/>
            Weather info: {props.weatherInfo}

        </div>
    )
}

export default Park;