import {createStore, combineReducers, applyMiddleware} from 'redux';
import {toDoReducer} from './toDo-reducer';
import thunkMiddleware from 'redux-thunk';


let reducers = combineReducers({
    toDoList: toDoReducer
});

export let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;