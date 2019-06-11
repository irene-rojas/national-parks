import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Park from "./Park/Park";

function App() {

    const [query, setQuery] = useState("");
    const [park, setPark] = useState([]);

    const getPark = () => {
        axios.get(`https://developer.nps.gov/api/v1/parks?api_key=${process.env.REACT_APP_NPS_API}&q=${query}`)
        .then(res => {
            setPark(res.data.data);
            console.log(res.data.data);
            console.log(res.data.data[0].name);
            console.log(res.data.data[0].fullName);
            console.log(res.data.data[0].states);
        })
    };

  return (
    <div className="App">

        
        <button onClick={() => getPark()}>Search</button>

        <div>
            {park.map(item => {
                return (
                    <Park 
                        key={item.id}
                        fullName={item.fullName}
                        location={item.states}
                    />
                )
            })}
        </div>
    </div>
  );
}

export default App;
