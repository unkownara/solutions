import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postStatus } from '../Reducers/MainFeedReducer';

/*
    Redux store -> Maintaining all the local state.
*/
export const store = createStore(combineReducers({
    mainFeedPostLists: postStatus
}),
    {},
    applyMiddleware(thunk)
);