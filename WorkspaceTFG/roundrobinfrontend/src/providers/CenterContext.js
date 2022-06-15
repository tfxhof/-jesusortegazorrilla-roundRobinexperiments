import  { createContext, useContext, useState } from 'react';


export const CenterContext = createContext(null);

/**
 * return the profile ready to use
 */
export const useCenterContext = () => useContext(CenterContext)

/**
 * Center provider.
 */
 export const CenterContextProvider = ({ children }) => {

    const [centerName, setCenterName] = useState({});
    const [centerEmail, setCenterEmail] = useState({});

    /**
       * This value is the data that the Context Provider offers to the rest of the app.
       */
    const value = {
        // Current center name.
        centerName,
        // Current center email.
        centerEmail,

        setCenterName,
        setCenterEmail,
   
    }
    return (
        <CenterContext.Provider value={value}>{children}</CenterContext.Provider>
    )
}
