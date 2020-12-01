import React, { useState, } from 'react'
import classes from './Statistics.module.css'

import ProfilesStatBox from './ProfilesStatBox/ProfilesStatBox';
import JobsStatBox from './JobsStatBox/JobsStatBox';

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';



const Statistics = () => {
  const [statisticsFilter, setStatisticsFilter] = useState("profile")

  /* CONDITIONAL RENDERING */
  const pageContent = () => {
    switch(statisticsFilter) {
      case "profile":
        return <ProfilesStatBox />
      case "job":
        return <JobsStatBox />
      default:
        break
    }
  }

  return(
    <div className={classes.StatisticsPage}>

      <h2 className={classes.StatisticsPageTitle}>Statistics</h2>

      <FormControl>

        <Select
          className={classes.FormControl}
          id="select-statistic-filter"
          value={statisticsFilter}
          onChange={(event) => setStatisticsFilter(event.target.value)}
        >
          <MenuItem value={"profile"}>By Monster</MenuItem>
          <MenuItem value={"job"}>By Job</MenuItem>

        </Select>
      </FormControl>

      <div className={classes.StatPageContent}>
        {
          pageContent()
        }
      </div>

    </div>
  )
}

export default Statistics