import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import Park from "./components/Park/Park";
import Map from "./components/Map/Map.js";

function App() {

    // const [query, setQuery] = useState("");
    // const [park, setPark] = useState([]);
    // const [parkError, setParkError] = useState(false);
    const [state, setState] = useState("");
    const [parks, setParks] = useState([]);

    const displayParks = () => {

        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&stateCode=${state}`)
        .then(res => {
            setParks(res.data.data);
            console.log(res.data.data);
            console.log(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&stateCode=${state}`);
        });
        
    }


  return (
    <div className="App">

        <div className="mapDiv">
            <Map 
                value={state}
                onClick={event => {
                    event.preventDefault();
                    setState(event.target.id);
                    displayParks(state);
                }}
                
            />
        </div>


        {/* <div className="parkSearchDiv">
            <form
                className="parkForm"
                onSubmit={event => {
                    event.preventDefault();
                    getPark();}}>
                    <input 
                        value={query}
                        onChange={event => {
                            event.preventDefault();
                            setQuery(event.target.value);
                            }}
                    />
                <button>Search</button>
            </form>

            {park.length === 0 && parkError === true &&
                <div>
                    No results. Please check spelling.
                </div>
            }
        </div> */}

        {/* <div>
            {park.map(item => {
                return (
                    <Park 
                        key={item.id}
                        fullName={item.fullName}
                        location={item.states}
                        description={item.description}
                        url={item.url}
                        weatherInfo={item.weatherInfo}
                    />
                )
            })}
        </div> */}
    </div>
  );
}

export default App;
