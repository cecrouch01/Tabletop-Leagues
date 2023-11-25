import {
    CHOOSE_ICON,
    SET_INITIAL_DATA,
    CREATE_LEAGUE
} from './actions';



export default function reducer(state, action) {
    switch (action.type) {
        case SET_INITIAL_DATA: {
            const { leagueData, usersData } = action.payload;
            const allLeagues = leagueData.allLeagues;
            const allUsers = usersData.allUsers;
            return {
                ...state,
                allLeagues,
                allUsers
            }
        }
        case CHOOSE_ICON: {
            return{
                ...state,
                icon: action.payload
            }; 
        }
        case CREATE_LEAGUE: {
            console.log(action.payload)
        }
        default:
            return;
    };
};