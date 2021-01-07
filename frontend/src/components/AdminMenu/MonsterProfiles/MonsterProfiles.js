import React, { useState, useContext, useEffect  } from 'react'

import { APIContext } from '../../../context/APIContext'
import ProfileCard from './ProfileCard/ProfileCard'

import CircularProgress from '@material-ui/core/CircularProgress'


const MonsterProfiles = () => {
  const API = useContext(APIContext)
  const [profiles, setProfiles] = useState(null)

  /* Get Profiles */
  useEffect(() => {
    API.list_profiles().then(setProfiles)
  }, [setProfiles, API])

  const toggleAdmin = (profileId) => {
    const newProfiles = profiles.map((profile) => {
      if (profile._id === profileId) {
        profile.is_admin = !profile.is_admin;
      }
      return profile;
    })
    setProfiles(newProfiles)
  }

  if (profiles === null) return <CircularProgress />

  return(
    <>
    <div className="site-page">Monster Profiles</div>
    <div>
      {
        profiles.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            toggleAdmin={toggleAdmin}
          />
        ))
      }

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