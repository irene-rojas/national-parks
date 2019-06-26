import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import SVGMap from "./components/Map/Map.js";
import spinning from "./spinning.gif";
import nps_logo from "./nps_logo.png";

function App() {

    const [state, setState] = useState("");
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(false);

    const displayParks = () => {
        setLoading(true);
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&stateCode=${state}&fields=images`)
        .then(res => {
            setParks(res.data.data);
            console.log(res.data.data);
        }).then(() => {
            setLoading(false);
        })
    }

  return (

    <div className="parallax">

    <div className="App">

        <div className="header">
            <h1 id="takeHike">Take A Hike!</h1>
            <h3 id="instruct">Click a state to see its national parks and trails</h3>
            <br/>
            <div className="poweredBy">
                Powered by
            </div>

            <div className="logoDiv">
                <a href="https://www.nps.gov/index.htm">
                    <img id="npsLogo" src={nps_logo} alt="logo"/>
                </a>
            </div>
        </div>

        <div className="mapDiv"> 

            <SVGMap 
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


        <div className="parkResultsDiv">

            <div  className="selectedState">
                {state && <div>You selected {state}.</div>}
                <br/>
                {loading === true && <img className="spinner" src={spinning} alt="loading"/>}
            </div>

                {loading === false && 
                    parks.map(park => {
                        return (
                            <Park 
                                key={park.id}
                                fullName={park.fullName}
                                location={park.states}
                                description={park.description}
                                url={park.url}
                                weatherInfo={park.weatherInfo}
                                images={park.images}
                            />
                        )
                    })}

        </div>
        {/* end parkResultsDiv */}

    </div>
    {/* end App */}

    </div>
    // end parallax
  );
}

export default App;
