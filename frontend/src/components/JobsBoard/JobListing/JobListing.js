import React from 'react'
import classes from './JobListing.module.css'
import { Link } from "react-router-dom"

const JobListing = ({job}) => {
  const postitClasses = [classes[job.postit_id], classes.PostitLink]

  /* TODO: logic to display £ if 1 or more, or p if less */

  return (
    <Link className={postitClasses.join(' ')} to={"/" + job._id}>
      <h5>{job.name}</h5>
      <p>£{job.reward}</p>
    </Link>
  )
}

export default JobListing