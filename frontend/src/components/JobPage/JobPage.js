import React, { useState, useEffect, useContext } from 'react'
import classes from './JobPage.module.css'
import '../../index.css'

import { useParams, Link } from "react-router-dom"
import { APIContext } from '../../context/APIContext'
import capitalize from '../../context/helperFunction'
import ProfileToggler from './ProfileToggler/ProfileToggler'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'

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
        <DialogTitle id="alert-dialog-title">{"Who did this job?"}</DialogTitle>

        <DialogContent>
            {
              profiles.map((profile) => {
                return (
                  <ProfileToggler
                    profileName={profile.name}
                    profilePicture={profile.picture}
                  />
                )
              })
            }
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDoneDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button color="primary" >
            Done!
          </Button>
        </DialogActions>

      </Dialog>

      <div className={postitClasses.join(' ')}>
        <h5>{capitalize(job.name)}</h5>
        <p>{capitalize(job.description)}</p>
        <p>£{job.reward}</p>

        <button className={"primary-button"} onClick={() => setOpenDoneDialog(true)}>
          DONE
        </button>
      </div>

    </div>
  )
}

export default JobPage