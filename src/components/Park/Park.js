import React from 'react';
import "./Park.css";
import ClampLines from 'react-clamp-lines';

const Park = (props) => {
    return (
        <section className="parkResult card">

            {
                props.images.length && <img className="parkImages mx-auto d-block" src={props.images[0].url} alt={props.images[0].title}/>
            }
            <br/>
            <br/>
            {props.fullName}
            <br/>
            Location: {props.location}
            <br/>
            <br/>
            <ClampLines
                text={props.description}
                id="readMore"
                lines={3}
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="readMoreText"
                innerElement="p"
            />
            <br/>
            <a href={props.url} target="_blank" rel="noopener noreferrer">Learn more about this park</a>

        </section>
    )
}

export default Park;