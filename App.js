import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppConfigWrapper from "./configs/appConfigWrapper";

export default function App() {
  return (
    <Provider store={store}>
      <AppConfigWrapper />
    </Provider>
  );
}
