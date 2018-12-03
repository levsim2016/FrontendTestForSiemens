import * as constants from './constants';

export const addTimeSeries = (timestamp, value) => {
    return { 
        type: constants.ADD_TIME_SERIES,
        timestamp, value
    };
}

export const deleteTimeSeries = (timestamp) => {
    return { type: constants.DELETE_TIME_SERIES, timestamp };
}