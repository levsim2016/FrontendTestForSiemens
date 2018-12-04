import * as constants from './constants';
import { differenceBy } from 'lodash/array';

console.log(localStorage.getItem('timeSeries'));
const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries')) || []
};

const rootReducer =(state = initialState, action) => {
    switch(action.type){
        case constants.ADD_TIME_SERIES:
            const newTimeSeries = {
                time: action.time,
                value: action.value
            };
            return { 
                ...state, 
                timeSeries: [ 
                    ...state.timeSeries, 
                    newTimeSeries
                ] 
            };
        case constants.DELETE_TIME_SERIES:
            console.log(differenceBy(state.timeSeries, [{ time: action.time }], 'time'));
            return {
                ...state, 
                timeSeries: differenceBy(state.timeSeries, [{ time: action.time }], 'time')
            };
        default:
            return state;
    }
};
export default rootReducer;


