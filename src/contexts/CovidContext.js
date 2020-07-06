import React, { createContext } from 'react';
import AppReducer from './AppReducer';

export const CovidContext = createContext({});

const initialState = {
    selectedCountryCode: 'GLB',
    countryListData: {},
    countryCovidData: {},
    worldCovidData: {},
    covidGeoData: {}
};

export const TransactionProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function getCountryCovidData(countryCode) {
        dispatch({
            type: 'GET_COUNTRY_COVIDDATA',
            payload: countryCode
        });
    }

    return (
        <CovidContext.Provider value={
            state,
            getCountryCovidData
        }>
            {children}
        </CovidContext.Provider>
    );
}