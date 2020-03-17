import React from "react";
import { Provider } from "react-redux";
import { Board } from "./components/Board";
import store from "./store/store";
function App() {
  return (
    <Provider store={store}>
      <Board></Board>
    </Provider>
  );
}

export default App;
