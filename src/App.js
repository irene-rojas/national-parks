import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import Map from "./components/Map/Map.js";
import { Tooltip } from 'react-svg-tooltip';

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

    const circleRef = React.createRef();

  return (
    <div className="App">

    <svg viewBox="0 0 100 100">
        <circle ref={circleRef} cx={50} cy={50} r={10} fill="steelblue" />
        <Tooltip triggerRef={circleRef}>
          <rect
            x={2}
            y={2}
            width={10}
            height={5}
            rx={0.5}
            ry={0.5}
            fill="black"
          />
          <text x={5} y={5} fontSize={2} fill="white">
            Yay!
          </text>
        </Tooltip>
      </svg>


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
