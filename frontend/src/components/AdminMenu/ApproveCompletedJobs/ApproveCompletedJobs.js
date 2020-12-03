import React from 'react'
import classes from './ApproveCompletedJobs.module.css'
import JobsToApprove from './JobsToApprove/JobsToApprove'


const ApproveCompletedJobs = () => {
  return (
    <div className="site-page">
      <h2 className="site-pageTitle">Approve Completed Jobs</h2>
      <JobsToApprove />
    </div>
  )
}

export default ApproveCompletedJobs