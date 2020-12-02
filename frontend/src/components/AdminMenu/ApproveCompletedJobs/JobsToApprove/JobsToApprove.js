import React, { useState, useContext, useEffect  } from 'react'
import JobToApprove from './JobToApprove/JobToApprove'
import CircularProgress from '@material-ui/core/CircularProgress'
import { APIContext } from '../../../../context/APIContext'
import classes from './JobsToApprove.module.css'

const JobsToApprove = () => {
  const API = useContext(APIContext)
  const [jobsToApprove, setjobsToApprove] = useState(null)

  useEffect(() => {
    API.list_jobinstances().then((jobInstances) => {
      setjobsToApprove(jobInstances)
    })
  }, [setjobsToApprove, API])

  if (jobsToApprove === null) return <CircularProgress />

  const pageContent = () => {
    if (jobsToApprove.length === 0) {
      return (
        <div className={classes.EmptyNotification}>Hey, it looks like there are no jobs to approve right now!</div>
      )
    } else {
      return(
        jobsToApprove.map((jobToApprove) => (
          <JobToApprove
            key={jobToApprove._id}
            jobToApprove={jobToApprove}
          />
        ))
      )
    }
  }

  return (
    pageContent()
  )
}

export default JobsToApprove