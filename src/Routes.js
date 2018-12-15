import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import App from './App';
import PostView from './Components/PostView';
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history = {history}>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={App}
                    />
                    <Route
                        path="/post_details"
                        component={PostView}
                    />
                </Switch>
            </Router>
        );
    }
}