import React from 'react'
import classes from './JobListing.module.css'
import { Link } from "react-router-dom"

const JobListing = ({job}) => {
  const postitClasses = [classes.JobPostit, classes[job.postit_id]]

  /* TODO: fix formatting around postit notes */

  return (
    <Link className={classes.PostitLink} to={"/" + job._id}>
      <div className={postitClasses.join(' ')}>
        <div className={classes.PostitBody}>
          <h5>{job.name}</h5>
          <p>£{job.reward}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobListing