import React from 'react'
import classes from './Togglers.module.css'

const SelectProfilePicToggler2 = (
  { currentPic, usedStatus, profileForPictureEditing, changeProfilePicture }
) => {

  // Logic for applying classes
  const profilePicClasses = [classes[currentPic], classes.ProfilePicDiv]


  if (currentPic === profileForPictureEditing.picture) {
    profilePicClasses.push(classes.Selected)
  } else if (usedStatus) {
    profilePicClasses.push(classes.Unavailable)
  }




  return (
    <div
      className={profilePicClasses.join(' ')}
      onClick={() => changeProfilePicture(currentPic)}
    ></div>

  )
}

export default SelectProfilePicToggler2