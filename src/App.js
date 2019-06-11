import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./Park/Park";

function App() {

    const [query, setQuery] = useState("");
    const [park, setPark] = useState([]);
    const [parkError, setParkError] = useState(false);

    const getPark = () => {
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&q=${query.replace(/ /g,"%20")}`)
        .then(res => {
            setPark(res.data.data.slice(0,20));
            console.log(res.data.data.slice(0,20));
            if (!park.length > 0) {
                setParkError(true);
            }
        })
    };

  return (
    <div className="App">

        <div className="parkSearchDiv">
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
        </div>

        <div>
            {park.map(item => {
                return (
                    <Park 
                        key={item.id}
                        fullName={item.fullName}
                        location={item.states}
                        description={item.description}
                    />
                )
            })}
        </div>
    </div>
  );
}

export default App;
