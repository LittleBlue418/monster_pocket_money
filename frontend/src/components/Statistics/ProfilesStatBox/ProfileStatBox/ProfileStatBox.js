import React from 'react'
import classes from './ProfileStatBox.module.css'
import { capitalize, formatCurrency } from '../../../../context/helperFunction'

const ProfileStatBox = ({ profile }) => {
  const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]

  return(
    <div className={classes.ProfileStatBox}>

      <div className={classes.ProfileHeader}>
        <div className={profilePicClasses.join(' ')}></div>
        <div>{profile.name}</div>
      </div>

      <div className={classes.ProfileBody}>
        {
          Object.entries(profile.completed_jobs).map((job_object) => {
            return(
              <div key={job_object[0]}>
                <span>{capitalize(job_object[1].job_name)}: </span>
                <span>{job_object[1].number_completed_instances}</span>
              </div>
            )
          })
        }
        <br></br>
        <div>Total pocket money earned: {formatCurrency(profile.total_money_earned)}</div>
      </div>



    </div>
  )
}

export default ProfileStatBox