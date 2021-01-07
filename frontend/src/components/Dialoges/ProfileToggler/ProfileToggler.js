import React from 'react'
import classes from './ProfileToggler.module.css'

const ProfileToggler = ({profile, onClick}) => {

  const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]

  if (profile.selected) {
    profilePicClasses.push(classes.Selected)
  }

  return (
    <div className={classes.ProfileDiv} onClick={onClick}>
      <div className={profilePicClasses.join(' ')}></div>
      <span>{profile.name}</span>
    </div>
  )
}

export default ProfileToggler