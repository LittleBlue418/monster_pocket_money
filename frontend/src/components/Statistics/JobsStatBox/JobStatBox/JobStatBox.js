import React from 'react'
import classes from './JobStatBox.module.css'

const JobStatBox = ({ job }) => {

  return(
    <div className={classes.JobStatBox}>
      <div>Job Stat Box</div>
      {/*
      <div>{job.name}</div>

      <div className={classes.JobBody}>
        {
          Object.entries(job.participants).map((job_participant) => {

            const profilePicClasses = [classes[job_participant.picture], classes.ProfilePicDiv]

            return(
              <div
                key={job_participant._id}
                className={classes.ParticipantDiv}
              >
                  <div className={profilePicClasses.join(' ')}></div>
                  <div>{job_participant.count}</div>
              </div>
            )
          })
        }
      </div>
      */}
    </div>
  )
}

export default JobStatBox