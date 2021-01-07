import React from 'react';
import ProfileToggler from './ProfileToggler/ProfileToggler';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export function EditJobInstanceParticipantsDialog (
  { jobInstanceToEdit, setJobInstanceToEdit, profiles, setProfiles, onSaveJobInstance }
) {

  /* Check if any profiles havce been selected */
  const anyProfileSelected = profiles.some(profile => profile.selected);

  /* Toggle 'selected' status on profiles */
  const toggleProfile = (profileId) => {
    const newProfiles = profiles.map((profile) => {
      if (profile._id === profileId) {
        profile.selected = !profile.selected;
      }
      return profile;
    });
    setProfiles(newProfiles);
  };

  return (
    <Dialog
      open={jobInstanceToEdit !== null}
      onClose={() => setJobInstanceToEdit(null)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <h2>Who did this job?</h2>

      <DialogContent>
        <div>
          {profiles.map((profile) => {
            return (
              <ProfileToggler
                profile={profile}
                key={profile._id}
                onClick={() => toggleProfile(profile._id)} />
            );
          })}
        </div>
      </DialogContent>

      <DialogActions>
        <button className={"site-button secondary-button"} onClick={() => setJobInstanceToEdit(null)} color="secondary">
          Cancel
        </button>

        <button
          className={"site-button primary-button"}
          color="primary"
          disabled={!anyProfileSelected}
          onClick={onSaveJobInstance}
        >
          Save
        </button>

      </DialogActions>

    </Dialog>
  );

}

