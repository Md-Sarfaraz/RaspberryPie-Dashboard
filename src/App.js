import './App.css';
import { Header } from "./fragments/Header";
import { Footer } from "./fragments/Footer";
import { Dashboard } from "./fragments/Dashboard";
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";


function App() {

  return (

    <Router>
      <div className="wrapper">
        <Header />

        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
