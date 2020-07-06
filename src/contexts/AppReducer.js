export default (state, action) => {
    switch (action.type) {
        case 'GET_COUNTRY_COVIDDATA':
            return {
                ...state,
                countryCovidData: getCountryCovidData(state.selectedCountryCode, state.worldCovidData)
            }
        default:
            return state;
    }
}

function getCountryCovidData(countryCode, worldCovidData){
      var countryCovidData = worldCovidData.find(data => data.countryCode === countryCode)
     
      if (countryCovidData)
        return countryCovidData;
}