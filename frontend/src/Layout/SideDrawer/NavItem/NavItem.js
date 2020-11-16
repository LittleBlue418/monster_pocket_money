import React from 'react'
import classes from './NavItem.module.css'
import { Link } from "react-router-dom"

const NavItem = ({ link, children}) => (
  <li className={classes.NavItem}>

      <Link
        to={link}>
        {children}
      </Link>

  </li>
)

export default NavItem