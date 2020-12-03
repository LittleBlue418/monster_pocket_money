import React, { useState, useEffect, useContext } from 'react'
import classes from './EditJobInstance.module.css'
import '../../../../context/siteStyling.css'
import { capitalize } from '../../../../context/helperFunction'

import { useParams, useHistory } from "react-router-dom"
import { APIContext } from '../../../../context/APIContext'
import ProfileToggler from './ProfileToggler/ProfileToggler'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'


const EditJobInstance = () => {
  const API = useContext(APIContext)
  const { jobinstance_id } = useParams()
  const history = useHistory()
  const [jobInstance, setJobInstance] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [openDoneDialog, setOpenDoneDialog] = useState(false)

  const cssClasses = {

    monsterButton: ["siteButton", "blackText"],
    approveButton: ["siteButton", "purpleBackground", "whiteText"],
    deleteButton: ["siteButton"],
  }

  /* Get Job instance */
  useEffect(() => {
    API.get_jobinstance(jobinstance_id).then((instance) => {
      setJobInstance(instance)
    })
  }, [jobinstance_id, API])

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
  const getSelectedParticipantIDs = () => {
    let participantIDs = []
    profiles.forEach((profile) => {
      if (profile.selected) {
        participantIDs.push(profile._id)
      }
    })
    return participantIDs
  }

  const saveJobInstanceToDatabase = () => {
    let updatedJobInstance = {
      "job_id": jobinstance_id.job_id,
      "participant_ids": getSelectedParticipantIDs(),
      "completion_date": 12,
      "is_approved": true
    }
    API.update_jobinstance(updatedJobInstance).then((response) => {
      console.log(response)
      history.push('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  if (jobInstance === null) {
    return <CircularProgress />
  }

  /* Check if any profiles havce been selected */
  const anyProfileSelected = profiles.some(profile => profile.selected)

  return (
    <div className="sitePage">

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

      <h2 className="sitePageTitle">Edit Job Instance</h2>

      <div className="siteBoxOutline">
        {capitalize(jobInstance.job.name)}
        {
        jobInstance.participants.map((participant) => (
          <span key={participant._id}> - {participant.name}</span>
        ))
      }
      </div>


      <button
        className={cssClasses.monsterButton.join(' ')}
        onClick={() => setOpenDoneDialog(true)}>
          Change Monsters
      </button>

      <button
        className={cssClasses.deleteButton.join(' ')}
        onClick={() => setOpenDoneDialog(true)}>
          Delete Job
      </button>

      <button
        className={cssClasses.approveButton.join(' ')}
        onClick={() => setOpenDoneDialog(true)}>
          Approve Job
      </button>
    </div>
  )
}

export default EditJobInstance