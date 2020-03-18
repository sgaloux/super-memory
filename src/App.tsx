import React from "react";
import { Provider } from "react-redux";
import { Board } from "./components/Board";

import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Board></Board>
      </PersistGate>
    </Provider>
  );
}

export default App;
