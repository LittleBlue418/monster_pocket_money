import React, { useState, useEffect, useContext } from 'react'
import classes from './JobPage.module.css'
import '../../index.css'

import { useParams } from "react-router-dom"
import { APIContext } from '../../context/APIContext'
import capitalize from '../../context/helperFunction'
import ProfileToggler from './ProfileToggler/ProfileToggler'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'


const JobPage = () => {
  const API = useContext(APIContext)
  const [job, setJob] = useState(null)
  const { job_id } = useParams()
  const [profiles, setProfiles] = useState([])
  const [openDoneDialog, setOpenDoneDialog] = useState(false)

  /* Get Job */
  useEffect(() => {
    API.get_job(job_id).then((job) => {
      setJob(job)
    })
  }, [job_id, API])

  /* Get Profiles + set selected */
  useEffect(() => {
    API.list_profiles().then((profiles) => {

      const updatedProfiles = profiles.map(profile => {
        profile["selected"] = false
        return profile
      })
      setProfiles(updatedProfiles)
    })
  }, [setProfiles, API])

  if (job === null) {
    return <CircularProgress />
  }

  const toggleProfile = (profile) => {
    console.log('function called')
    const oldProfiles = [...profiles]
    /* TODO: onClick not responding */
  }

  /* Postit background */
  const postitClasses = [classes[job.postit_id], classes.JobPostit]

  return (
    <div className={classes.JobPage}>

      <Dialog
        open={openDoneDialog}
        onClose={() => setOpenDoneDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <h2 className={classes.DialogueTitle}>Who did this job?</h2>

        <DialogContent>
          <div className={classes.ProfilesDiv}>
            {
              profiles.map((profile) => {
                return (
                  <ProfileToggler
                    profileName={profile.name}
                    profilePicture={profile.picture}
                    key={profile._id}
                    onClick={() => toggleProfile(profile)}
                  />
                )
              })
            }
            </div>
        </DialogContent>

        <DialogActions className={classes.ButtonDiv}>
          <button className={"site-button secondary-button"} onClick={() => setOpenDoneDialog(false)} color="secondary">
            Cancel
          </button>
          <button className={"site-button primary-button"} color="primary" >
            Done
          </button>
        </DialogActions>

      </Dialog>

      <div className={postitClasses.join(' ')}>
        <h5>{capitalize(job.name)}</h5>
        <p>{capitalize(job.description)}</p>
        <p>£{job.reward}</p>

        <button className={"site-button primary-button"} onClick={() => setOpenDoneDialog(true)}>
          Done
        </button>
      </div>

    </div>
  )
}

export default JobPage