import React from "react";
import "./App.css";
import Image_Upload from "./component/Image_Upload";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Image_Upload />} />
      </Routes>
    </div>
  );
};

export default App;
