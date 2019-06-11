import React from 'react';

const Park = (props) => {
    return (
        <div>
            Park name: {props.fullName}
            <br/>
            Location: {props.location}

        </div>
    )
}

export default Park;