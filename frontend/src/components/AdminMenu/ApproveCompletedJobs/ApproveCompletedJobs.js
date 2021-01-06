import React, { useState, useContext, useEffect  } from 'react'
import classes from './ApproveCompletedJobs.css'

import { APIContext } from '../../../context/APIContext'
import JobInstanceCard from './JobInstanceCard/JobInstanceCard'

import CircularProgress from '@material-ui/core/CircularProgress'
import { DeleteDialogue } from './Dialoges/DeleteDialogue'
import { EditDialogue } from './Dialoges/EditDialogue'


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

  if (jobInstances.length === 0)
    return (
        <div className={classes.EmptyNotification}>
          Hey, it looks like there are no jobs to approve right now!
        </div>
      )


  return (
    <>

      <EditDialogue
        jobInstanceToEdit={jobInstanceToEdit}
        setJobInstanceToEdit={setJobInstanceToEdit}
        profiles={profiles}
        setProfiles={setProfiles}
        onSaveJobInstance={saveJobInstanceToDatabase}
      />

      <DeleteDialogue
        jobInstanceToDelete={jobInstanceToDelete}
        setJobInstanceToDelete={setJobInstanceToDelete}
        onDeleteJobInstance={deleteJobinstance}
      />

      {
        jobInstances.map((jobInstance) => (
          <JobInstanceCard
            key={jobInstance._id}
            jobInstance={jobInstance}
            onApprove={approveJobinstance}
            onEdit={editJobinstance}
            onDelete={setJobInstanceToDelete}
          />
        ))
      }

    </>
  )
}

export default JobsToApprove