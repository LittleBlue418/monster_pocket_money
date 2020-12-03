import React from 'react'
import classes from './JobToApprove.module.css'
import { capitalize } from '../../../../../context/helperFunction'
import { Link } from "react-router-dom"

const JobToApprove = ( {jobToApprove} ) => {
  const cssClasses = {
    jobToApproveContainer: ["siteBoxOutline", classes.JobToApproveContainer],
    editButton: ["site-button", "secondary-button"],
    approvebutton: ["site-button", "primary-button"]
  }

  const approvejobToApprove = () => (
    console.log("approve button clicked")
  )

  return (
    <div className={cssClasses.jobToApproveContainer.join(' ')}>
      <div>
      {capitalize(jobToApprove.job.name)}
      <span> &nbsp;</span>

      {
        jobToApprove.participants.map((participant) => (
          <span key={participant._id}> - {participant.name}</span>
        ))
      }
      </div>
      <div>

        <Link
          className={cssClasses.editButton.join(' ')}
          to={`edit_jobinstance/${jobToApprove._id}`}
        >Edit</Link>

        <button
          className={cssClasses.approvebutton.join(' ')}
          onClick={approvejobToApprove}
        >Approve</button>

      </div>

    </div>
  )
}

export default JobToApprove