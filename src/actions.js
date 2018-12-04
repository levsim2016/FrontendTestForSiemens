import * as constants from './constants';
import { castArray } from 'lodash/lang';
import { pullAllBy } from 'lodash/array';

export const addTimeSeries = (time, value) => {
    const series = castArray(JSON.parse(localStorage['timeSeries']));
    series.push({ time, value });
    localStorage.setItem('timeSeries', JSON.stringify(series));

    return { 
        type: constants.ADD_TIME_SERIES,
        time, value
    };
}

export const deleteTimeSeries = (time) => {
    const series = castArray(JSON.parse(localStorage['timeSeries']));
    pullAllBy(series, [{ time }], 'time')
    localStorage.setItem('timeSeries', JSON.stringify(series));

    return { type: constants.DELETE_TIME_SERIES, time };
}