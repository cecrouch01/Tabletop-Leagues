import {
    TEST
} from './actions';



export default function reducer(state, action) {
    switch (action.type) {
        case TEST: {
            console.log("Hello there")
            return; 
        }
        default:
            return;
    };

};