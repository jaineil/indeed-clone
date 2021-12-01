import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers/combineReducer';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

function configureStore(initialState = {}) {

    const persistConfig = {
        key: 'root',
        storage,
    }

    const middleware = [thunk];

    const persistedReducer = persistReducer(persistConfig, rootReducer)


    const store = createStore(
        persistedReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        ));
    const persistor = persistStore(store, null, () => {
        // if you want to get restoredState
        console.log("restoredState", store.getState());
    });

  return { store, persistor };
}  

export default configureStore;

// import { createStore, combineReducers } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import rootReducer from "./_reducers/combineReducer";

// function configureStore(initialState = {}) {
  

//   const store = createStore(persistReducer({
//     key: "root",
//     debug: true,
//     storage
//   }, rootReducer), initialState);

//   console.log("initialState", store.getState());

//   const persistor = persistStore(store, null, () => {
//     // if you want to get restoredState
//     console.log("restoredState", store.getState());
//   });

//   return { store, persistor };
// }

// export default configureStore;