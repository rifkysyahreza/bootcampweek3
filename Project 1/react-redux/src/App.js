import "./App.css";
import { Route, Switch, Redirect, PrivateRoute } from "react-router-dom";
import axios from "axios";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import { routePrivate, routePublic } from "./Route/Route";

function App() {
  // axios
  //   .get("http://www.omdbapi.com/?i=tt3896198&apikey=397031c0")
  //   .then((response) => {
  //     console.log(response.data);
  //   });

  return (
    <div>
      <Navbar></Navbar>
      <Switch>
        {routePrivate ? (
          routePrivate.map((elements, index) => (
            <Route
              key={index}
              exact={elements.exact}
              path={elements.path}
              render={() => {
                if (localStorage.getItem("Bearer") === null) {
                  return (
                    <Redirect
                      to={{
                        pathname: "/login",
                        state: { returnUrl: window.location.pathname },
                      }}
                    />
                  );
                }
                return elements.return;
              }}
            />
          ))
        ) : (
          <h1>Tidak ada data!</h1>
        )}

        {routePublic ? (
          routePublic.map((elements, index) => (
            <Route
              key={index}
              exact={elements.exact}
              path={elements.path}
              render={() => {
                if (localStorage.getItem("Bearer") != null) {
                  return (
                    <Redirect
                      to={{
                        pathname: "/profile",
                        state: { returnUrl: window.location.pathname },
                      }}
                    />
                  );
                }
                return elements.return;
              }}
            />
          ))
        ) : (
          <h1>Tidak ada data!</h1>
        )}
      </Switch>
    </div>
  );
}

export default App;
