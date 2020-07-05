import React, {useState, useEffect} from 'react';
import Header from './components/Header'
import Main from './components/Main'
import { fetchCountryData } from './apis/CovidApi';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [countryData, setCountryData] = useState();
  const [globalCountryData, setGlobalCountryData] = useState();

  function handleCountrySelected(countryCode){
    if(countryCode === 'GL'){
      setCountryData(globalCountryData);
    }
    var filteredData = data.features.filter(feature => feature.properties.iso_a3 === countryCode)
    if(filteredData.length > 0)
      setCountryData(filteredData[0].properties)
  }

  useEffect(() => {
      
        async function fetchData() {
          const data = fetch("https://covid19-data.p.rapidapi.com/geojson-ww", {
              "method": "GET",
              "headers": {
                  "x-rapidapi-host": "covid19-data.p.rapidapi.com",
                  "x-rapidapi-key": "dbf67c03a6mshcdf93c761d0bd26p1079a3jsn825caf63e790"
              }
          });
          const jsonData = (await data).json();
          const dataFromApi = await jsonData;

          const dailyData = await fetchCountryData();
          var globalData = {
            confirmed: dailyData.confirmed.value,
            deaths: dailyData.deaths.value,
            recovered: dailyData.recovered.value,
            pop_est: 78000000
          };
          setCountryData(globalData);
          setGlobalCountryData(globalData);
          
          setData(dataFromApi);
        }
        fetchData();
  }, []);
  
  return (
    <div className="App">
      <Header data={data} handleCountrySelected={handleCountrySelected}/>
      <Main data={data} countryData={countryData} />
    </div>
  );
}

export default App;
