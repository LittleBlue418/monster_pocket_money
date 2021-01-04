import React, { useState, useContext, useEffect } from 'react'
import JobStatBox from './JobStatBox/JobStatBox'
import { APIContext } from '../../../context/APIContext'

import CircularProgress from '@material-ui/core/CircularProgress'


const JobsStatBox = () => {
  const API = useContext(APIContext)
  const [jobs, setJobs] = useState(null)


  useEffect(() => {
    API.list_profiles().then((profiles) => {

      // building the dictionary of jobs
      const jobs_dict = {}

      profiles.forEach((profile) => {
        if (!profile.completed_jobs) {
          return
        }

        Object.entries(profile.completed_jobs).forEach(([job_id, job_object]) => {
          // TODO: rename this variable to something more clear
          const profileToAppend = {
            "_id": profile._id,
            "name": profile.name,
            "picture": profile.picture,
            "number_completed_instances": job_object.number_completed_instances
          }

          if (jobs_dict[job_id] === undefined) {
            jobs_dict[job_id] = {
              "name": job_object.job_name,
              "job_id": job_id,
              "profiles": [profileToAppend]
            }
          } else {
            jobs_dict[job_id].profiles.push(profileToAppend)
          }

        })
      })

      // Convert the job dict to a list
      const jobs = Object.values(jobs_dict)

      // Sort jobs alphabetically
      jobs.sort((a, b) => a.name.localeCompare(b.name))

      // Sort profiles by number completed instances
      jobs.forEach((job) => {
        job.profiles.sort((a, b) => {
          return b.number_completed_instances - a.number_completed_instances
        })
      })

      setJobs(jobs)

    })
  }, [setJobs, API])

  if (jobs === null) {
    return <CircularProgress />
  }

  return (
    jobs.map((job) => (
      <JobStatBox
        key={job.job_id}
        job={job}
      />
    ))
  )
}

export default JobsStatBox