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
import Statistics from '../components/Statistics/Statistics'

import AdminMenu from '../components/AdminMenu/AdminMenu'
import ApproveCompletedJobs from '../components/AdminMenu/ApproveCompletedJobs/ApproveCompletedJobs'


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
  typography: {
    fontFamily: ["Comic Sans MS"].join(",")
  },
  props: {
    MuiSelect: {
      variant: "outlined"
    }
  }
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

          <Route path="/statistics">
            <Statistics />
          </Route>

          <Route path="/admin" >
            <AdminMenu />
          </Route>

          <Route path="/approve_completed">
            <ApproveCompletedJobs />
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
