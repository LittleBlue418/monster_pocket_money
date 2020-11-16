import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import JobsBoard from '../components/JobsBoard/JobsBoard'
import Layout from '../Layout/Layout'

function App() {
  return (
    <Router>

      <Layout />

      <Switch>

        <Route path="/">
          <JobsBoard />
        </Route>

      </Switch>

    </Router>

  );
}

export default App;
