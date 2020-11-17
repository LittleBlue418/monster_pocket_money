import React from 'react'

import siteLogo from '../../assets/icons/logo.png'
import classes from './SiteHeader.module.css'
import MenuIcon from '@material-ui/icons/Menu'

const SiteHeader = ({toggleSidedrawer}) => (
  <header className={classes.SiteHeader}>

    {/* Site Logo */}
    <div className={classes.Logo}>
      <img src={siteLogo} alt="Site Logo"/>
    </div>

    {/* Site Title */}
    <div className={classes.SiteTitle}>
      <span>Monster Jobs</span>
    </div>

    {/* Menu Icon */}
    <div className={classes.ButtonDiv} onClick={toggleSidedrawer}>
      <MenuIcon style={{
        color: 'grey',
        width: '40px',
        height: '40px',
        }}/>
    </div>

  </header>
)

export default SiteHeader