import React from "react";
// import Button from "./Button";

const { lazy, Suspense } = React;

//引入远程的Button
const Button = lazy(() => import("app2/Button"));
const App = () => (
  <div>
    <h3>基础的Remote微前端应用</h3>
    <h2>组件</h2>
    <hr />
    <Suspense fallback="loading...">
      <Button />
    </Suspense>
  </div>
);

export default App;
