import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import SVGMap from "./components/Map/Map.js";
import spinning from "./spinning.gif";
import nps_logo from "./nps_logo.png";

// const stateNames = 
//     [
//         {name: "Alaska", id: "AK"},x
//         {name: "Hawaii", id: "HI"},x
//         {name: "Alabama", id: "AL"},x
//         {name: "Arkansas", id: "AR"},x
//         {name: "Arizona", id: "AZ"},x
//         {name: "California", id: "CA"},x
//         {name: "Colorado", id: "CO"},x
//         {name: "Connecticut", id: "CT"},x
//         {name: "Delaware", id: "DE"},x
//         {name: "Florida", id: "FL"},x
//         {name: "Georgia", id: "GA"},x
//         {name: "Iowa", id: "IA"},x
//         {name: "Idaho", id: "ID"},x
//         {name: "Illinois", id: "IL"},x
//         {name: "Indiana", id: "IN"},x
//         {name: "Kansas", id: "KS"},x
//         {name: "Kentucky", id: "KY"},x
//         {name: "Louisiana", id: "LA"},x
//         {name: "Massachusetts", id: "MA"},x
//         {name: "Maryland", id: "MD"},x
//         {name: "Maine", id: "ME"},x
//         {name: "Michigan", id: "MI"},x
//         {name: "Minnesota", id: "MN"},x
//         {name: "Missouri", id: "MO"},x
//         {name: "Mississippi", id: "MS"},x
//         {name: "Montana", id: "MT"},x
//         {name: "North Carolina", id: "NC"},x
//         {name: "North Dakota", id: "ND"},x
//         {name: "Nebraska", id: "NE"},x
//         {name: "New Hampshire", id: "NH"},x
//         {name: "New Jersey", id: "NJ"},x
//         {name: "New Mexico", id: "NM"},x
//         {name: "Nevada", id: "NV"},x
//         {name: "New York", id: "NY"},x
//         {name: "Ohio", id: "OH"},x
//         {name: "Oklahoma", id: "OK"},x
//         {name: "Oregon", id: "OR"},x
//         {name: "Pennsylvania", id: "PA"},x
//         {name: "Rhode Island", id: "RI"},x
//         {name: "South Carolina", id: "SC"},x
//         {name: "South Dakota", id: "SD"},x
//         {name: "Tennessee", id: "TN"},x
//         {name: "Texas", id: "TX"},x
//         {name: "Utah", id: "UT"},x
//         {name: "Virginia", id: "VA"},x
//         {name: "Vermont", id: "VT"},x
//         {name: "Washington", id: "WA"},x
//         {name: "Wisconsin", id: "WI"},x
//         {name: "West Virginia", id: "WV"},x
//         {name: "Wyoming", id: "WY"}x
//     ];

const stateMap = {
    "AK": "Alaska",
    "HI": "Hawaii",
    "AR": "Arkansas",
    "AZ": "Arizona",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "FL": "Florida",
    "GA": "Georgia",
    "IA": "Iowa",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "MA": "Massachusetts",
    "MD": "Maryland",
    "ME": "Maine",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MO": "Missouri",
    "MS": "Mississippi",
    "MT": "Montana",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "NE": "Nebraska",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NV": "Nevada",
    "NY": "New York",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PA": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VA": "Virginia",
    "VT": "Vermont",
    "WA": "Washington",
    "WI": "Wisconsin",
    "WV": "West Virginia",
    "WY": "Wyoming"
}   


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
                    {state && <div>You selected {targetState.name}.</div>}
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
