import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import JobsBoard from '../components/JobsBoard/JobsBoard'
import Layout from '../Layout/Layout'
import JobPage from '../components/JobPage/JobPage'
import Money from '../components/Money/Money'

// MateriaUI bug: https://github.com/mui-org/material-ui/issues/13394
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme, } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#7e57c2'
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Layout />

        <Switch>

          <Route path="/money">
            <Money />
          </Route>

          <Route path="/:job_id">
            <JobPage />
          </Route>

          <Route path="/">
            <JobsBoard />
          </Route>

        </Switch>

      </Router>
    </ThemeProvider>
  );
}

export default App;
