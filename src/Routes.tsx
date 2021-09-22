import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProfileContextProvider } from "./context/ProfileContext";
import { Home } from "./pages/Home";
import Repos from "./pages/Repos";

export default function Routes() {
  return (
    <ProfileContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/repos" component={Repos} exact={true} />
        </Switch>
      </BrowserRouter>
    </ProfileContextProvider>
  );
}
