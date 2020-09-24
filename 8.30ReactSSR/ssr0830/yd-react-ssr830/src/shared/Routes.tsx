import Home from "./Home";
import About from "./About";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
    loadData: About.loadData,
  },
];

export default routes
