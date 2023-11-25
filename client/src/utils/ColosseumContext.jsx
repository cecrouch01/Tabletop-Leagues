import { createContext, useContext, useReducer } from "react";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { QUERY_LEAGUES, QUERY_USERS } from "./queries";
import reducer from "./reducers";
import { SET_INITIAL_DATA } from "./actions";

const ColosseumContext = createContext();

const useColosseumContext = () => useContext(ColosseumContext);

const ColosseumProvider = ({ children }) => {
    const { loading: leaguesLoading, data: leagueData } = useQuery(QUERY_LEAGUES);
    // const allLeagues = leagueData?.allLeagues

    const { loading: usersLoading, data: usersData } = useQuery(QUERY_USERS);
    // const allUsers = usersData?.allUsers 
    
    const [state, dispatch] = useReducer(reducer, {});
    useEffect(() => {
        if(leagueData && usersData) {
            dispatch({ type: SET_INITIAL_DATA, payload: {leagueData, usersData}})
        }
    }, [leagueData, usersData])
  

    return (
        <ColosseumContext.Provider value={[state, dispatch]}>
            {children}
        </ColosseumContext.Provider>
    );
};

export {ColosseumProvider, useColosseumContext}