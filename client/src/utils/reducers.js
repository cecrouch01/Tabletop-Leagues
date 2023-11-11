import {
    CHOOSE_ICON,
} from './actions';



export default function reducer(state, action) {
    switch (action.type) {
        case CHOOSE_ICON: {
            return{
                ...state,
                icon: action.payload
            }; 
        }
        default:
            return;
    };

};