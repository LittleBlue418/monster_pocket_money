import React from 'react'

import classes from './SideDrawer.module.css'
import siteLogo from '../../assets/icons/logo.png'
import NavItem from './NavItem/NavItem'


const SideDrawer = ({ toggleSidedrawer, sidedrawerShown }) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (sidedrawerShown === true) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
    <>
      <div className={attachedClasses.join(' ')}>

        {/* Site logo - toggles menu */}
        <div
          className={classes.MenuLogo}
          onClick={toggleSidedrawer}
        >
          <img src={siteLogo} alt="Site Logo"/>
        </div>

        {/* Menu navigation */}
        <nav onClick={toggleSidedrawer}>
          <ul className={classes.NavItems}>

            <NavItem
              link="/">
              Jobs Board
            </NavItem>

            <NavItem
              link="/money">
              Money
            </NavItem>

            <NavItem
              link="/statistics">
              Statistics
            </NavItem>

            <NavItem
              link="/admin">
              Settings
            </NavItem>

          </ul>
        </nav>

      </div>
    </>
  )
}

export default SideDrawer