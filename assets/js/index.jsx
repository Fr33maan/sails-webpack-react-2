import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from 'reducers'

import { hostConfig } from './config/hostConfig'

import App   from 'components/Page/App'

import SignIn         from 'components/Auth/SignIn'
import SignUp         from 'components/Auth/SignUp'
import SignOut        from 'components/Auth/SignOut'

import { UserIsAuthenticated, UserIsNotAuth } from 'util/authWrappers'
const Authenticated = UserIsAuthenticated((props) => props.children);
const NotAuthenticated = UserIsNotAuth((props) => props.children);

// TODO : status if logger is necessary or not
// const logger = createLogger()


// TODO : remove this from prod build
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(...[thunk, routerMiddleware(browserHistory)]),
  )
)


// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={ App } >
        <Route component={Authenticated}>
          <Route path="/sign_out"     component={SignOut} />
        </Route>

        <Route component={NotAuthenticated}>
          <Route path="/sign_in" component={SignIn} />
          <Route path="/sign_up" component={SignUp} />
        </Route>

      </Route>
    </Router>
  </Provider>,
  document.getElementById('react-app')
)
