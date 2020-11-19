import React, { useState, useEffect, useContext } from 'react'
import classes from './Money.module.css'
import { APIContext } from '../../context/APIContext'
import CircularProgress from '@material-ui/core/CircularProgress'
import CurrentMoney from './CurrentMoney/CurrentMoney'
import TotalMoney from './TotalMoney/TotalMoney'


const Money = () => {
  const API = useContext(APIContext)
  const [profiles, setProfiles] = useState(null)

  /* Get Profiles */
  useEffect(() => {
    API.list_profiles().then((profiles) => {

      const sortedProfiles = profiles.sort((a, b) => {
          return b.total_money_earned - a.total_money_earned
      })

      setProfiles(sortedProfiles)
    })
  }, [setProfiles, API])


  if (profiles === null) {
    return <CircularProgress />
  }

  return (
    <div className={classes.MoneyPage}>

      <h2 className={classes.MoneyPageTitle}>Current Money Owed</h2>

      <div className={classes.CurrentMoneyDiv}>
        {
          profiles.map((profile) => {
            return (
              <CurrentMoney
                profile={profile}
                key={profile._id}
              />
            )
          })
        }
      </div>

      <div className={classes.LineBreak}></div>

      <h2 className={classes.MoneyPageTitle}>Total Money Earned</h2>

      <div className={classes.TotalMoneyDiv}>
        {
          profiles.map((profile, index) => {
            return (
              <TotalMoney
                index={index}
                profile={profile}
                key={profile._id}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Money