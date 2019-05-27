import React from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Images from './components/layout/Images'
function App() {
  return (
    <div className="App container">
      <Navbar />
      <Images />
    </div>
  );
}

export default App;
