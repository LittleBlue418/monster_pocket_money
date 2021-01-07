import React, { useState, useContext, useEffect  } from 'react'

import { APIContext } from '../../../context/APIContext'
import ProfileCard from './ProfileCard/ProfileCard'
import SelectProfilePicDialog2 from '../../Dialoges/SelectProfilePicDialog2'

import CircularProgress from '@material-ui/core/CircularProgress'


// Make the names a text input where user can type new name
// Profile images are clickable, pop open dialog box with all monster pics
// Add monster should create new profile
// Save pops up confirmation, then save to db
// remove profile feature with dialog warning will delete data cannot be undone

const MonsterProfiles = () => {
  const API = useContext(APIContext)
  const [profiles, setProfiles] = useState(null)
  const [editProfilePicDialogOpen, setEditProfilePicDialogOpen] = useState(false)
  const [profileForPictureEditing, setProfileForPictureEditing] = useState(null)
  const [profilePicsInUse, setProfilePicsInUse] = useState(null)

  /* Get Profiles */
  useEffect(() => {
    API.list_profiles().then((profiles) => {
      const updatedPicsInUse = {
        "monster-1": false,
        "monster-2": false,
        "monster-3": false,
        "monster-4": false,
        "monster-5": false,
        "monster-6": false,
        "monster-7": false,
        "monster-8": false
      }

      // Setting the selected for use in toggler
      const updatedProfiles = profiles.map(profile => {
        profile["selected"] = false

        // Setting the pics in use for use in toggler
        updatedPicsInUse[profile["picture"]] = true
        return profile
      })

      setProfilePicsInUse(updatedPicsInUse)
      setProfiles(updatedProfiles)
    })
  }, [setProfiles, setProfilePicsInUse, API])

  const toggleAdmin = (profileId) => {
    const newProfiles = profiles.map((profile) => {
      if (profile._id === profileId) {
        profile.is_admin = !profile.is_admin;
      }
      return profile;
    })
    setProfiles(newProfiles)
  }

  const editProfileImage = (profile) => {
    setProfileForPictureEditing(profile)
    setEditProfilePicDialogOpen(true)
  }

  if (profiles === null) return <CircularProgress />

  return(
    <>

    <SelectProfilePicDialog2
      editProfilePicDialogOpen={editProfilePicDialogOpen}
      setEditProfilePicDialogOpen={setEditProfilePicDialogOpen}
      profilePicsInUse={profilePicsInUse}
      setProfilePicsInUse={setProfilePicsInUse}
      profileForPictureEditing={profileForPictureEditing}
      setProfileForPictureEditing={setProfileForPictureEditing}
    />


    <div className="site-page">Monster Profiles</div>
    <div>
      {
        profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            toggleAdmin={toggleAdmin}
            editProfileImage={editProfileImage}
          />
        ))
      }

    <div>

    </div>

    <button className=" primary-button">
      Add monster
    </button>
    </div>



    <button className=" primary-button">
      save
    </button>
    </>
  )
}

export default MonsterProfiles