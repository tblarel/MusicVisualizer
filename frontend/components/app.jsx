// React Dependencies
import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

// import Modal from './modal/modal';
// import SignupContainer from './session/signup_container';
import SplashContainer from './splash/splash_container';
// import { AuthRoute, ProtectedRoute } from '../util/route_util';


const App = () => (
    <div id="app">
        {/* <Modal /> */}
        <Switch>
            <Route path="/" component={SplashContainer} />
        </Switch>
    </div>
);

export default App;