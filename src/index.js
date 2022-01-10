import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.css';
import App from './App';
import {createStore, applyMiddleware, compose} from "redux";
import logger from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import reportWebVitals from './reportWebVitals';
import rootReducer from "./reducers";
import { BrowserRouter } from "react-router-dom";

const enhancer =
    process.env.NODE_ENV === "production"
        ? compose(applyMiddleware())
        : composeWithDevTools(applyMiddleware(logger));

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
const store = createStore(rootReducer, enhancer);

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
