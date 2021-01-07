import React from 'react'
import classes from './ProfileCard.module.css'

const ProfileCard = ({ profile, toggleAdmin, editProfileImage }) => {
  const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]

  return(
    <div className={classes.ProfileCard}>
      <div className="siteBoxOutline">{profile.name}</div>

      <div className="siteBoxOutline">
        <button onClick={() => toggleAdmin(profile._id)}>
          {profile.is_admin ? "Admin" : "Make Admin"}
        </button>
      </div>

      <div
        className={profilePicClasses.join(' ')}
        onClick={() => editProfileImage(profile)}
      ></div>
    </div>
  )
}

export default ProfileCard