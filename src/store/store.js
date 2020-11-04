import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'

import userReducer from '../reducers/user'
import newsReducer from '../reducers/news'

    const reducer = combineReducers({
        user:userReducer,
        news:newsReducer
    });


    const middleware = [thunk]

    const composeEnhancers =
    (process.env.NODE_ENV === 'development' &&
        typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true,
            traceLimit: 25,
        })) ||
    compose;


    const store = createStore(
        reducer,
        {},
        composeEnhancers(
            applyMiddleware(
                ...middleware,
            ),
        ),        
    );
export default store;