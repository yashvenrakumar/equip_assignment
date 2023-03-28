//import dependencies
import React from "react";

import { Outlet, Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <nav>
        <div className="navigation">
          <div>
            <Link to="/">Home</Link>
          </div>

          <div>
            <Link to="/registration">registration</Link>
          </div>

          <div>
            <Link to="/login">login</Link>
          </div>

          <div>
            <Link to="/update">update</Link>
          </div>

          <div>
            <Link to="/read">read</Link>
          </div>

          <div>
            <Link to="/delete">delete</Link>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Home;
