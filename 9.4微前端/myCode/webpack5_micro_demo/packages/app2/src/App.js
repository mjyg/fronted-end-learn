import React from "react";
import Button from "./Button";

const { lazy, Suspense } = React;
const App = () => (
  <div>
    <h3>基础的Remote微前端应用</h3>
    <h2>组件</h2>
    <hr />
    <Button />
  </div>
);

export default App;
