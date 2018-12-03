import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from './reducers';
import App from './components/App';


const history = createBrowserHistory();
const store = createStore(
    createRootReducer(history),
    window.__INITIAL_STATE__,
    compose(
        applyMiddleware(
            routerMiddleware(history)
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>, 
    document.getElementById('app')
);
