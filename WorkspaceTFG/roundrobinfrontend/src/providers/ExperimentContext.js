import  { createContext } from 'react';

// export function MyProvider(props) {

//     const [expName, setExpName] = useState({});

//     return (
//         <div>
//             <AppContext.Provider value={[expName,setExpName]}>
//                 {props.children}
//             </AppContext.Provider>
//         </div>
//     )
// }

//export default MyProvider;
export const ExpContext = createContext(null);
