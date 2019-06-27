import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import SVGMap from "./components/Map/Map.js";
import spinning from "./spinning.gif";
import nps_logo from "./nps_logo.png";

const stateNames = 
    [
        {name: "Alaska", id: "AK"},
        {name: "Hawaii", id: "HI"},
        {name: "Alabama", id: "AL"},
        {name: "Arkansas", id: "AR"},
        {name: "Arizona", id: "AZ"},
        {name: "California", id: "CA"},
        {name: "Colorado", id: "CO"},
        {name: "Connecticut", id: "CT"},
        {name: "Delaware", id: "DE"},
        {name: "Florida", id: "FL"},
        {name: "Georgia", id: "GA"},
        {name: "Iowa", id: "IA"},
        {name: "Idaho", id: "ID"},
        {name: "Illinois", id: "IL"},
        {name: "Indiana", id: "IN"},
        {name: "Kansas", id: "KS"},
        {name: "Kentucky", id: "KY"},
        {name: "Louisiana", id: "LA"},
        {name: "Massachusetts", id: "MA"},
        {name: "Maryland", id: "MD"},
        {name: "Maine", id: "ME"},
        {name: "Michigan", id: "MI"},
        {name: "Minnesota", id: "MN"},
        {name: "Missouri", id: "MO"},
        {name: "Mississippi", id: "MS"},
        {name: "Montana", id: "MT"},
        {name: "North Carolina", id: "NC"},
        {name: "North Dakota", id: "ND"},
        {name: "Nebraska", id: "NE"},
        {name: "New Hampshire", id: "NH"},
        {name: "New Jersey", id: "NJ"},
        {name: "New Mexico", id: "NM"},
        {name: "Nevada", id: "NV"},
        {name: "New York", id: "NY"},
        {name: "Ohio", id: "OH"},
        {name: "Oklahoma", id: "OK"},
        {name: "Oregon", id: "OR"},
        {name: "Pennsylvania", id: "PA"},
        {name: "Rhode Island", id: "RI"},
        {name: "South Carolina", id: "SC"},
        {name: "South Dakota", id: "SD"},
        {name: "Tennessee", id: "TN"},
        {name: "Texas", id: "TX"},
        {name: "Utah", id: "UT"},
        {name: "Virginia", id: "VA"},
        {name: "Vermont", id: "VT"},
        {name: "Washington", id: "WA"},
        {name: "Wisconsin", id: "WI"},
        {name: "West Virginia", id: "WV"},
        {name: "Wyoming", id: "WY"}
    ];


function App() {

    const [state, setState] = useState("");
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [targetState, setTargetState] = useState(
        {name: "", id: ""}
    )

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

    // convert stateId to stateNames
    // const state = const stateNames.id
    // when stateNames.id set, display stateNames.name instead

    function displayStateNames(props) {
        let targetStateId = props;
        setTargetState({
            id: targetStateId,
        });
        console.log(targetState);
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
                        displayStateNames(event.target.id);
                        console.log(`Selected state: ${event.target.id}`);
                    }}
                />
                {/* Click order: onMouseDown, onMouseUp, onClick. Hence, displayParks @ onClick runs after onMouseUp and only once */}

            </div>

            <div className="parkResultsDiv">

                <div  className="selectedState">
                    {state && <div>You selected {targetState}.</div>}
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
