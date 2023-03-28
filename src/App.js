import "./App.css";
import ReactDOM, { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import Home from "./component/home";
import React from "react";
import Register from "./component/registration";
import Login from "./component/login";
import Update from "./component/update";
import Read from "./component/read";
import Delete from "./component/delete";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="registration" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="update" element={<Update />} />
        <Route path="read" element={<Read />} />
        <Route path="delete" element={<Delete />} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./component/home";
// import Navigation from "./component/navigation";

// function App() {
//   return (
//     <Router>
//       <Navigation />
//       <Switch>
//         <Route exact path="/">
//           <Home />
//         </Route>
//         <Route path="/about">
//           <Home />
//         </Route>
//         <Route path="/contact">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;
