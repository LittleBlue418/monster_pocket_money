import React, { useState, useContext, useEffect } from 'react'
import ProfileStatBox from './ProfileStatBox/ProfileStatBox'
import { APIContext } from '../../../context/APIContext'
import CircularProgress from '@material-ui/core/CircularProgress'


const ProfilesStatBox = () => {
  const API = useContext(APIContext)
  const [profiles, setProfiles] = useState(null)

  useEffect(() => {
    API.list_profiles().then((profiles) => {
      setProfiles(profiles)
    })
  }, [setProfiles, API])

  if (profiles === null) {
    return <CircularProgress />
  }

  return(
    profiles.map((profile) =>(
      <ProfileStatBox
        profile={profile}
        key={profile._id}
      />
    ))
  )
}

export default ProfilesStatBox