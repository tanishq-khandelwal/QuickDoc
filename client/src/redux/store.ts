import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { watchAuthSaga } from "./sagas/loginSaga";
import rootReducer from "./rootSaga";

const sagaMiddleware=createSagaMiddleware();

const store=configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchAuthSaga);

export type AppDispatch = typeof store.dispatch; // Typing for dispatch
export type RootState = ReturnType<typeof store.getState>;

export default store;