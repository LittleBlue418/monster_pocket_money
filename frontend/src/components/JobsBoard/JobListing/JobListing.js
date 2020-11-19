import React from 'react'
import classes from './JobListing.module.css'
import { Link } from "react-router-dom"
import { capitalize, formatCurrency } from '../../../context/helperFunction'

const JobListing = ({job}) => {
  const postitClasses = [classes[job.postit_id], classes.PostitLink]

  return (
    <Link className={postitClasses.join(' ')} to={"/" + job._id}>
      <h5>{capitalize(job.name)}</h5>
      <p>{formatCurrency(job.reward)}</p>
    </Link>
  )
}

export default JobListing