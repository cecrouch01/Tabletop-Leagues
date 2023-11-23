import {
    CHOOSE_ICON,
    SET_INITIAL_DATA
} from './actions';



export default function reducer(state, action) {
    switch (action.type) {
        case CHOOSE_ICON: {
            return{
                ...state,
                icon: action.payload
            }; 
        }
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
        default:
            return;
    };
};