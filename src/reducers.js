import * as constants from './constants';
import { differenceBy } from 'lodash/array';

const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries')) || []
};

/*
    основная функция для получения состояния приложения
    при этом фактически возврашается новый обьект, без изменения состояния, 
    определённого с начала работы программы
*/
const rootReducer =(state = initialState, action) => {
    switch(action.type){
        //добавляем новое значение
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
        //удаление значения, время когда было добавлено значение выступает в качестве уникального ключа
        case constants.DELETE_TIME_SERIES:
            return {
                ...state, 
                timeSeries: differenceBy(state.timeSeries, [{ time: action.time }], 'time')
            };
        default:
            return state;
    }
};
export default rootReducer;


