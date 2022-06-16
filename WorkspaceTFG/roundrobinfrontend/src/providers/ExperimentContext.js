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
    const [measurementName, setMeasurementName] = useState({});
    const [measureInstructions, setMeasureInstructions] = useState({});
    const [expStatus, setExpStatus] = useState({});


    /**
       * This value is the data that the Context Provider offers to the rest of the app.
       */
    const value = {
        // Current experiment name.
        expName,
        // Current experiment measure name.
        measureName,
        // Current experiment measurement name.
        measurementName,
        // Current experiment measurement description.
        measureInstructions,
        // Current experiment status.
        expStatus,
        
        setExpName,
        setMeasureName,
        setMeasurementName,
        setMeasureInstructions,
        setExpStatus,
    }
    return (
        <ExpContext.Provider value={value}>{children}</ExpContext.Provider>
    )
}

// <ExpContextProvider>

// <CenterContext.Provider value={{ centerEmail, setCenterEmail }}></CenterContext.Provider>