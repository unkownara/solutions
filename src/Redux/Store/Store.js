import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { postStatus } from '../Reducers/MainFeedReducer';

export const store = createStore(combineReducers({
    mainFeedPostLists: postStatus
}),
    {},
    applyMiddleware(thunk)
);