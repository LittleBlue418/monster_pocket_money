import React, { useState, useContext, useEffect } from 'react'
import { APIContext } from '../../context/APIContext'

import classes from './JobsBoard.module.css'
import JobListing from './JobListing/JobListing'

const JobsBoard = () => {

  const API = useContext(APIContext)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    API.list_jobs().then(jobs => {
      setJobs(jobs)
    })
  }, [API])

  return (
    <div className={classes.JobsBoard}>
      {
        jobs.map((job) => (
          <JobListing
            job={job}
            key={job._id}
          />
        ))
      }

    </div>
  )
}

export default JobsBoard