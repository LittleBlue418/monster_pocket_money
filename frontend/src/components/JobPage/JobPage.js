import React, { useState, useEffect, useContext } from 'react'
import classes from './JobPage.module.css'
import '../../index.css'

import { useParams, useHistory } from "react-router-dom"
import { APIContext } from '../../context/APIContext'
import { capitalize, formatCurrency } from '../../context/helperFunction'
import ProfileToggler from './ProfileToggler/ProfileToggler'


import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'


const JobPage = () => {
  const API = useContext(APIContext)
  const [job, setJob] = useState(null)
  const { job_id } = useParams()
  const [profiles, setProfiles] = useState([])
  const [openDoneDialog, setOpenDoneDialog] = useState(false)

  const history = useHistory()

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

  /* Toggle 'selected' status on profiles */
  const toggleProfile = (profileId) => {
    const newProfiles = profiles.map((profile) => {
      if (profile._id === profileId) {
        profile.selected = !profile.selected
      }
      return profile
    })
    setProfiles(newProfiles)
  }

  /* Returns list of selected participant ID's */
  const getSelectedParticipants = () => {
    let participantIDs = []
    profiles.forEach((profile) => {
      if (profile.selected) {
        participantIDs.push(profile._id)
      }
    })
    return participantIDs
  }

  const saveJobInstanceToDatabase = () => {
    let newJobInstance = {
      "job_id": job_id,
      "participants": getSelectedParticipants(),
      "completion_date": 12,
      "is_approved": false
    }
    API.create_jobinstance(newJobInstance).then((response) => {
      console.log(response)
      history.push('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  if (job === null) {
    return <CircularProgress />
  }

  /* Postit background */
  const postitClasses = [classes[job.postit_id], classes.JobPostit]

  /* Check if any profiles havce been selected */
  const anyProfileSelected = profiles.some(profile => profile.selected)

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
                    profile={profile}
                    key={profile._id}
                    onClick={() => toggleProfile(profile._id)}
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

          <button
            className={"site-button primary-button"}
            color="primary"
            disabled={!anyProfileSelected}
            onClick={saveJobInstanceToDatabase}
          >
            Done
          </button>

        </DialogActions>

      </Dialog>

      <div className={postitClasses.join(' ')}>
        <h5>{capitalize(job.name)}</h5>
        <p>{capitalize(job.description)}</p>
        <p>{formatCurrency(job.reward)}</p>

        <button className={"site-button primary-button"} onClick={() => setOpenDoneDialog(true)}>
          Done
        </button>
      </div>

    </div>
  )
}

export default JobPage