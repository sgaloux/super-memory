import React from "react";
import { AppLogicProvider } from "./contexts/AppLogic";
import { Board } from "./components/Board";

function App() {
  return (
    <AppLogicProvider>
      <Board></Board>
    </AppLogicProvider>
  );
}

export default App;
