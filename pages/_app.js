import React from "react";
import Head from "next/head";
import "../styles/globals.css";
// import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "../reducers/user";


const persistConfig = { key: "blog-SG651QG5Q", storage };

const persistedReducer = persistReducer(persistConfig, user);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Blog Of The Street</title>
        </Head>
        <Component {...pageProps} />
        {/* <Toaster /> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
