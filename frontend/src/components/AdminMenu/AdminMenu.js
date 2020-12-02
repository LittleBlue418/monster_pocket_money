import React from 'react'
import classes from './AdminMenu.module.css'
import { Link } from "react-router-dom"

const AdminMenu = () => {
  return(

    <div className={classes.AdminMenu}>

      <h2 className={classes.AdminPageTitle}>Admin</h2>

      <Link className={classes.AdminMenuItem}  to={"/approve_completed"}>
        <p>Approve Completed jobs</p>
      </Link>

      <Link className={classes.AdminMenuItem}  to={"/manage_jobs"}>
        <p>Manage Jobs</p>
      </Link>

      <Link className={classes.AdminMenuItem}  to={"/money_manager"}>
        <p>Pocket Money Manager</p>
      </Link>

      <Link className={classes.AdminMenuItem}  to={"/profile_manager"}>
        <p>Monser Profiles</p>
      </Link>

    </div>
  )
}

export default AdminMenu