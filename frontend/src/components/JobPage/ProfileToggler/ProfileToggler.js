import React from 'react'
import classes from './ProfileToggler.module.css'

const ProfileToggler = ({profileName, profilePicture}) => {

  const profilePicClasses = [classes[profilePicture], classes.ProfilePicDiv]

  return (
    <div className={classes.ProfileDiv}>
      <div className={profilePicClasses.join(' ')}></div>
      <span>{profileName}</span>
    </div>
  )
}

export default ProfileToggler