import React from 'react'

import SelectProfilePicToggler2 from './Togglers/SelectProfilePicToggler2'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const SelectProfilePicDialog2 = (
  { editProfilePicDialogOpen, setEditProfilePicDialogOpen,
    profilePicsInUse, setProfilePicsInUse,
    profileForPictureEditing, setProfileForPictureEditing }
) => {

  // Toggle the picture for selected account
  const changeProfilePicture = (picture) => {
    if (profilePicsInUse[picture]) return

    const updatedProfile = {...profileForPictureEditing}
    const updatedPicsInUse = {...profilePicsInUse}
    updatedProfile["picture"] = picture
    updatedPicsInUse[picture] = true
    updatedPicsInUse[profileForPictureEditing.picture] = false

    console.log("changeProfilePicture")
    setProfileForPictureEditing(updatedProfile)
    setProfilePicsInUse(updatedPicsInUse)
  }

  console.log(profileForPictureEditing)

  return (
    <Dialog
      open={editProfilePicDialogOpen}
      onClose={() => setEditProfilePicDialogOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <h2>Choose Your Monster</h2>

      <DialogContent>
        {
          Object.entries(profilePicsInUse).map(([currentPic, usedStatus]) => {
            return (
              <SelectProfilePicToggler2
                key={currentPic}
                currentPic={currentPic}
                usedStatus={usedStatus}
                profileForPictureEditing={profileForPictureEditing}
                changeProfilePicture={changeProfilePicture}
              />
            )
          })
        }
      </DialogContent>

      <DialogActions>
        <button
          onClick={() => setEditProfilePicDialogOpen(false)}
        >
          Cancel
        </button>
        <button

        >
          Save
        </button>
      </DialogActions>
    </Dialog>

  )
}

export default SelectProfilePicDialog2