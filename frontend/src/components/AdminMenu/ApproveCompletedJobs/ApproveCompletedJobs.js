import React, { useState, useContext, useEffect  } from 'react'
import classes from './ApproveCompletedJobs.css'

import { APIContext } from '../../../context/APIContext'

import JobInstanceCard from './JobInstanceCard/JobInstanceCard'
import ProfileToggler from './ProfileToggler/ProfileToggler'

import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'


const JobsToApprove = () => {
  const API = useContext(APIContext)
  const [jobInstances, setJobInstances] = useState(null)
  const [jobInstanceToEdit, setJobInstanceToEdit] = useState(null)
  const [jobInstanceToDelete, setJobInstanceToDelete] = useState(null)
  const [profiles, setProfiles] = useState([])

  /* Get Job instance */
  useEffect(() => {
    API.list_jobinstances().then(setJobInstances)
  }, [setJobInstances, API])

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


  const approveJobinstance = (jobInstance) => {
    API.approve_jobinstance(jobInstance._id)
      .then((approvedJobInstance) => {
        const updateJobInstanceList = jobInstances.filter(instance =>
          instance._id !== approvedJobInstance._id
        )
        setJobInstances(updateJobInstanceList)
      }).catch((error) => {
        console.log(error)
      })
  }

  const editJobinstance = (jobInstance) => {
    setJobInstanceToEdit(jobInstance)

    const newProfiles = profiles.map((profile) => {
      profile.selected = jobInstance.participant_ids.includes(profile._id)
      return profile
    })

    setProfiles(newProfiles)
  }

  const deleteJobinstance = () => {
    API.delete_jobinstance(jobInstanceToDelete._id)
      .then(() => {
        const updateJobInstanceList = jobInstances.filter(instance =>
          instance._id !== jobInstanceToDelete._id
        )
        setJobInstances(updateJobInstanceList)
        setJobInstanceToDelete(null)
      }).catch((error) => {
        console.log(error)
      })

  }



  const saveJobInstanceToDatabase = () => {
    const participantIDs = []
    profiles.forEach((profile) => {
      if (profile.selected) {
        participantIDs.push(profile._id)
      }
    })

    API.update_jobinstance(
      jobInstanceToEdit._id, participantIDs)
      .then((updatedJobInstance) => {
        console.log(updatedJobInstance)
        const updatedJobInstanceList = jobInstances.map((jobInstance) => {
          if (jobInstance._id === updatedJobInstance._id) {
            return updatedJobInstance
          } else {
            return jobInstance
          }
        })


        setJobInstances(updatedJobInstanceList)
        setJobInstanceToEdit(null)

      }).catch((error) => {
        console.log(error)
      })
  }

  if (jobInstances === null) return <CircularProgress />

  const pageContent = () => {
    if (jobInstances.length === 0) {
      return (
        <div className={classes.EmptyNotification}>
          Hey, it looks like there are no jobs to approve right now!
        </div>
      )

    } else {
      return(
        jobInstances.map((jobInstance) => (
          <JobInstanceCard
            key={jobInstance._id}
            jobInstance={jobInstance}
            onApprove={approveJobinstance}
            onEdit={editJobinstance}
            onDelete={setJobInstanceToDelete}
          />
        ))
      )
    }
  }

  /* Check if any profiles havce been selected */
  const anyProfileSelected = profiles.some(profile => profile.selected)

  return (
    <>
      <Dialog
          open={jobInstanceToEdit !== null}
          onClose={() => setJobInstanceToEdit(null)}
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
            <button className={"site-button secondary-button"} onClick={() => setJobInstanceToEdit(null)} color="secondary">
              Cancel
            </button>

            <button
              className={"site-button primary-button"}
              color="primary"
              disabled={!anyProfileSelected}
              onClick={saveJobInstanceToDatabase}
            >
              Save
            </button>

          </DialogActions>

        </Dialog>

        <Dialog
          open={jobInstanceToDelete !== null}
          onClose={() => setJobInstanceToDelete(null)}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <h2 className={classes.DialogueTitle}>Are you sure?</h2>


          <DialogActions className={classes.ButtonDiv}>
            <button className={"site-button secondary-button"} onClick={() => setJobInstanceToDelete(null)} color="secondary">
              Cancel
            </button>

            <button
              className={"site-button primary-button"}
              color="primary"
              onClick={deleteJobinstance}
            >
              Delete
            </button>

          </DialogActions>

        </Dialog>

      {
        pageContent()
      }

    </>
  )
}

export default JobsToApprove