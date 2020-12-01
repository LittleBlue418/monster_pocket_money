import React, { useState, useEffect, useContext } from 'react'
import classes from './Statistics.module.css'
import { APIContext } from '../../context/APIContext'

import CircularProgress from '@material-ui/core/CircularProgress'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { InputLabel } from '@material-ui/core';
import ProfileStatBox from './ProfileStatBox/ProfileStatBox';
import JobStatBox from './JobStatBox/JobStatBox';


const Statistics = () => {
  const API = useContext(APIContext)
  const [profiles, setProfiles] = useState(null)
  const [statisticsFilter, setStatisticsFilter] = useState("profile")
  const [statsByJob, setStatsByJob] = useState(null)

  /* Get Profiles */
  useEffect(() => {
    API.list_profiles().then((profiles) => {

      setProfiles(profiles)
    })
  }, [setProfiles, API])


  if (profiles === null) {
    return <CircularProgress />
  }

  const handleFilter = (event) => {
    setStatisticsFilter(event.target.value);
  }

  /* CONDITIONAL RENDERING */
  const pageContent = () => {
    if (statisticsFilter === "profile") {
      return (
        profiles.map((profile) =>(
          <ProfileStatBox
            profile={profile}
            key={profile._id}
          />
        ))
      )
    } else if (statisticsFilter === "job") {
      return (
        profiles.map((profile) =>(
          <JobStatBox
            profile={profile}
            key={profile._id}
          />
        ))
      )
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
          onChange={handleFilter}
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