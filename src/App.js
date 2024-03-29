import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./components/Park/Park";
import SVGMap from "./components/Map/Map.js";
import spinning from "./spinning.gif";
import nps_logo from "./nps_logo.png";


const stateMap = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District of Columbia",
    "FL": "Florida",
    "GA": "Georgia",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
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
    "VT": "Vermont",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};


function App() {

    const [state, setState] = useState("");
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(false);

    const displayParks = () => {
        setState(state);
        setLoading(true);
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&stateCode=${state}&fields=images`)
        .then(res => {
            setParks(res.data.data);
            // console.log(res.data.data);
        }).then(() => {
            setLoading(false);
        })
    }

    const listState = (e) => {
        setState(e.target.value);
        // console.log(e.target.value);
    }

  return (

    <div className="parallax">

        <main className="App">

            <header className="header">
                <h1 id="takeHike">Take A Hike!</h1>
                <h5 id="instruct">Use the map or list to see a state's national parks and trails</h5>
                <br/>
                <div className="poweredBy">
                    Powered by
                </div>

                <div className="logoDiv">
                    <a href="https://www.nps.gov/index.htm" target="_blank" rel="noopener noreferrer">
                        <img id="npsLogo" src={nps_logo} alt="NPS Logo"/>
                    </a>
                </div>
            </header>

            <figure className="mapDiv"> 
                <SVGMap 
                    value={state}
                    onClick={displayParks}
                    onMouseUp={event => {
                        event.preventDefault();
                        setState(event.target.id);
                        // console.log(`Selected state: ${event.target.id}`);
                    }}
                />
            </figure>
            {/* Click order: onMouseDown, onMouseUp, onClick. Hence, displayParks @ onClick runs after onMouseUp and only once */}

            <div className='stateList'>
                <form 
                className='stateDropdown'
                    onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission behavior
                    displayParks();
                }}>
                    <select className="form-select form-select-sm" id="states_list" value={state} onChange={listState} title="State Dropdown List">
                        <option>Select a state from the list</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>

                    <input type="submit" className="stateSubmit btn btn-light btn-sm"/>
                </form>
            </div>

            <div className="parkResultsDiv">

                <div  className="selectedState">
                    {state && <div>You selected {stateMap[state]}.</div>}
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

        </main>
        {/* end App */}

    </div>
    // end parallax
  );
}

export default App;
