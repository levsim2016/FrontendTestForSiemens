import * as constants from './constants';
import { differenceBy } from 'lodash/array';

const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries')) || []
};

const rootReducer =(state = initialState, action) => {
    switch(action.type){
        case constants.ADD_TIME_SERIES:
            const newTimeSeries = {
                timestamp: action.timestamp,
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
            return {
                ...state, 
                timeSeries: differenceBy(state.timeSeries, [{ timestamp: action.timestamp }], 'timestamp')
            };
        default:
            return state;
    }
};
export default rootReducer;


