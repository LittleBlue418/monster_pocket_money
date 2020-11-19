import React from 'react'
import classes from './TotalMoney.module.css'

const TotalMoney = ({profile, index}) => {

  const profilePicClasses = [classes[profile.picture], classes.ProfilePicDiv]
  let ranking
  console.log(index)

  if (index === 0) {
    ranking = <div className={classes.Winner}></div>
  } else {
    ranking = <div className={classes.Rank}>{index += 1}</div>
  }

  return (
    <div className={classes.EachTotalMoneyDiv}>
      {ranking}
      <div className={profilePicClasses.join(' ')}></div>
      <div className={classes.ProfileText}>{profile.name} - £{profile.total_money_earned}</div>
    </div>
  )
}

export default TotalMoney