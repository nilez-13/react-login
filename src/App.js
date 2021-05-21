import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./containers/LoginPage";
import LoggedIn from "./containers/LoggedIn";
import NotFound from "./containers/NotFound";

function App() {
  const token = sessionStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {token ? (
            <>
              <Route exact path={`/`} component={LoginPage} />
              <Route exact path={`/success`} component={LoggedIn} />

              <Route component={NotFound} />
            </>
          ) : (
            <Route component={LoginPage} />
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
