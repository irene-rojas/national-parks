import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import Map from "./components/Map/Map.js";

function App() {

    const [state, setState] = useState("");
    const [parks, setParks] = useState([]);

    const displayParks = () => {
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&stateCode=${state}`)
        .then(res => {
            setParks(res.data.data);
            console.log(res.data.data);
        });
    }

    // need loading animation since API is slow

  return (
    <div className="App">

        <div>
            Click a state to see its national parks and trails
        </div>

        <div className="mapDiv">
            <Map 
                value={state}
                onClick={displayParks}
                onMouseUp={event => {
                    event.preventDefault();
                    setState(event.target.id);
                    console.log(`Selected state: ${event.target.id}`);
                }}
            />
            {/* Click order: onMouseDown, onMouseUp, onClick. Hence, displayParks @ onClick runs after onMouseUp and only once */}
        </div>

        <div>
            <div>You selected {state}.</div>
            {parks.map(park => {
                return (
                    <Park 
                        key={park.id}
                        fullName={park.fullName}
                        location={park.states}
                        description={park.description}
                        url={park.url}
                        weatherInfo={park.weatherInfo}
                    />
                )
            })}
        </div>
    </div>
  );
}

export default App;
