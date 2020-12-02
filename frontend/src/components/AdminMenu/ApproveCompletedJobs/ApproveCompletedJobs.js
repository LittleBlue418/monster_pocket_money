import React from 'react'
import classes from './ApproveCompletedJobs.module.css'
import '../../../context/siteStyling.css'
import JobsToApprove from './JobsToApprove/JobsToApprove'


const ApproveCompletedJobs = () => {
  return (
    <div className="sitePage">
      <h2 className="sitePageTitle">Approve Completed Jobs</h2>
      <JobsToApprove />
    </div>
  )
}

export default ApproveCompletedJobs