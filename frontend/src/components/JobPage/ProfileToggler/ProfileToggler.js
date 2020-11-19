import React from 'react'
import classes from './ProfileToggler.module.css'

const ProfileToggler = ({profileName, profilePicture}) => {

  return (
    <div className={classes.ProfileDiv}>
      <div>{profilePicture}</div>
      <p>{profileName}</p>
    </div>
  )
}

export default ProfileToggler