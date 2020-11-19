import React from 'react'
import classes from './CurrentMoney.module.css'

const CurrentMoney = ({profile}) => {

  const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]


  return (
    <div className={classes.MoneyOwedDiv}>
      <div className={profilePicClasses.join(' ')}></div>
      <div className={classes.ProfileText}>£{profile.money_owed}</div>
    </div>
  )
}

export default CurrentMoney