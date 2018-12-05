import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import rootReducer from './reducers';

//получаем массив значений из локального хранилища браузера
//если ничего нет, то инициализируем массив пустым
localStorage.setItem('timeSeries',localStorage.getItem('timeSeries') || '[]');
//начальное состояние для Redux'а
const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries'))
};

const store = createStore(rootReducer, initialState);

//рендерим на страницу
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('app')
);
