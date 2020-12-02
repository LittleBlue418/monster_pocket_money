import React from 'react'
import classes from './JobToApprove.module.css'
import { capitalize } from '../../../../../context/helperFunction'
import '../../../../../context/siteStyling.css'

const JobToApprove = ( {jobToApprove} ) => {
  const cssClasses = {
    jobToApproveContainer: ["siteBoxOutline", classes.JobToApproveContainer],
    editButton: ["siteButton", ],
    approvebutton: ["siteButton", "purpleBackground", "whiteText"]
  }

  const editjobToApprove = () => (
    console.log("edit button clicked")
  )

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

        <button
          className={cssClasses.editButton.join(' ')}
          onClick={editjobToApprove}
        >Edit</button>

        <button
          className={cssClasses.approvebutton.join(' ')}
          onClick={approvejobToApprove}
        >Approve</button>

      </div>

    </div>
  )
}

export default JobToApprove