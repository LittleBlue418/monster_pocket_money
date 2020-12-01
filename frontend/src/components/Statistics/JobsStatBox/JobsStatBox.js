import React, { useState } from 'react'
import JobStatBox from './JobStatBox/JobStatBox'

const JobsStatBox = () => {
  const [statsByJob, setStatsByJob] = useState(null)
  return (
    <JobStatBox />
  )
}

export default JobsStatBox