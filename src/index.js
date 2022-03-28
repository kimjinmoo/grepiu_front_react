import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.css';
import 'react-notifications/lib/notifications.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import reportWebVitals from './reportWebVitals';
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import ReactGA from "react-ga4";

const enhancer =
    process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(thunk))
        : composeWithDevTools(applyMiddleware(thunk));

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
const store = createStore(rootReducer, enhancer);

ReactGA.initialize('G-K8Z60TN09X');
ReactGA.send("home");

ReactDOM.render(
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
