import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import rootReducer from './reducers';

const initialState = {
    timeSeries: JSON.parse(localStorage.getItem('timeSeries')) || []
};
const store = createStore(rootReducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, 
    document.getElementById('app')
);
