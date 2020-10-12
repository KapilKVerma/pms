import React, { useState, useEffect, createContext, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import fire from "./fire";

import "./App.js";

import LoadingSpinner from "./LoadingSpinner";

export const UserContext = createContext();

const App = () => {
  const [userDetails, setUserDetails] = useState();
  const [user, setUser] = useState("");

  // Lazy Loading
  const HomePage = React.lazy(() => import("./HomePage/Homepage"));
  const Imagegallery = React.lazy(() =>
    import("./HomePage/components/Imagegallery/Imagegallery")
  );
  const ContactMe = React.lazy(() =>
    import("./HomePage/components/Contactme/Contactme")
  );
  const AboutMe = React.lazy(() =>
    import("./HomePage/components/Aboutme/Aboutme")
  );
  const PortfolioImages = React.lazy(() =>
    import("./HomePage/components/Imagegallery/Portfolioimages")
  );
  const Dashboard = React.lazy(() => import("./Admin/Dashboard/Dashboard"));
  const Login = React.lazy(() => import("./Admin/Login/Login"));

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
    axios
      .get(`${process.env.REACT_APP_BACKEND}/userdetails/`)
      .then((res) => {
        setUserDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <main>
        {userDetails && (
          <UserContext.Provider value={userDetails}>
            <Suspense
              fallback={
                <div>
                  <LoadingSpinner />
                </div>
              }
            >
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/contact" exact component={ContactMe} />
                <Route path="/aboutme" exact component={AboutMe} />
                <Route path="/imagegallery" exact component={Imagegallery} />
                <Route path="/p/:id" exact component={PortfolioImages} />
                <Route path="/admin" exact>
                  {user ? <Dashboard /> : <Login />}
                </Route>
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </UserContext.Provider>
        )}
      </main>
    </Router>
  );
};

export default App;
