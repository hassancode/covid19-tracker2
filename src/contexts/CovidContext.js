import React, { createContext } from 'react';

export const CovidContext = createContext({});

export const TransactionProvider = ({ children }) => {
    return (
        <CovidContext.Provider value={{
            countries: {},
            countryCovidData: {},
            covidGeoData: {}
        }
        }>
            {children}
        </CovidContext.Provider>
    );
}