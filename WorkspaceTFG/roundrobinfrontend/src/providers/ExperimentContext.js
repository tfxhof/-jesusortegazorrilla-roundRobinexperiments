import React, { createContext, useContext, useState } from 'react';

//export default MyProvider;
export const ExpContext = createContext(null);

/**
 * return the profile ready to use
 */
export const useExpContext = () => useContext(ExpContext)

/**
 * Profile Experiment provider.
 */
export const ExpContextProvider = ({ children }) => {

    const [expName, setExpName] = useState({});
    const [measureName, setMeasureName] = useState({});

    /**
       * This value is the data that the Context Provider offers to the rest of the app.
       */
    const value = {
        // Current experiment name.
        expName,
        // Current experiment measure name.
        measureName,

        setExpName,
        setMeasureName,
    }
    return (
        <ExpContext.Provider value={value}>{children}</ExpContext.Provider>
    )
}

// <ExpContextProvider>

// <CenterContext.Provider value={{ centerEmail, setCenterEmail }}></CenterContext.Provider>