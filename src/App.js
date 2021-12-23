import './App.css';
import { Header } from "./fragments/Header";
import { Footer } from "./fragments/Footer";
import { Dashboard } from "./fragments/Dashboard";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import { SocketProvider } from "./services/SocketContext";
import SettingsPage from './fragments/SettingsPage';
import NotePad from "./fragments/NotePad";

function App() {


  return (
    <Router>
      <div className="wrapper">
        <Header />

        <Switch>
          <Route exact path="/">
            <SocketProvider>
              <Dashboard />
            </SocketProvider>
          </Route>
          <Route exact path="/settings">
            <SocketProvider>
              <SettingsPage />
            </SocketProvider>
          </Route>
          <Route exact path="/notepad">
            <NotePad />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
