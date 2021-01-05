import React from 'react'
import classes from './JobInstanceCard.module.css'
import { capitalize } from '../../../../context/helperFunction'


const JobInstanceCard = ( { jobInstance, onApprove, onEdit, onDelete } ) => {

  const cssClasses = {
    jobInstanceCard: ["siteBoxOutline", classes.JobInstanceCard],
    editButton: ["site-button", "secondary-button"],
    approveButton: ["site-button", "primary-button"],
    deleteButton: ["site-button", "primary-button"]
  }

  return (
    <div className={cssClasses.jobInstanceCard.join(' ')}>

      <div>
      {capitalize(jobInstance.job.name)}
      <span> &nbsp;</span>

      {
        jobInstance.participants.map((participant) => (
          <span key={participant._id}> - {participant.name}</span>
        ))
      }
      </div>

      <div>

        <button
          className={cssClasses.editButton.join(' ')}
          onClick={() => onEdit(jobInstance)}
        >Edit</button>

        <button
          className={cssClasses.deleteButton.join(' ')}
          onClick={() => onDelete(jobInstance)}
        >Delete</button>

        <button
          className={cssClasses.approveButton.join(' ')}
          onClick={() => onApprove(jobInstance)}
        >Approve</button>

      </div>

    </div>
  )
}

export default JobInstanceCard