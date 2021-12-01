import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, connect } from 'react-redux';
import configureStore from "./store";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
const { store, persistor } = configureStore();

ReactDOM.render(
  
  <Provider store={store}>
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

