import { createContext, useContext, useReducer } from "react";
import reducer from "./reducers";

const ColosseumContext = createContext();

const useColosseumContext = () => useContext(ColosseumContext);

const ColosseumProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {})


    return (
        <ColosseumContext.Provider value={[state, dispatch]}>
            {children}
        </ColosseumContext.Provider>
    );
};

export {ColosseumProvider, useColosseumContext}