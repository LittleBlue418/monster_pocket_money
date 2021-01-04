import React from 'react'
import classes from './JobStatBox.module.css'
import { capitalize } from '../../../../context/helperFunction'

const JobStatBox = ({ job }) => {

  return(
    <div className={classes.JobStatBox}>

      <div className={classes.JobHeading}>
        {capitalize(job.name)}
      </div>

      <div className={classes.JobBody}>
        {
          job.profiles.map((profile) => {
            const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]

            return(
              <div
                key={profile._id}
                className={classes.ParticipantDiv}
              >
                  <div className={profilePicClasses.join(' ')}></div>
                  <div>{profile.number_completed_instances}</div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default JobStatBox