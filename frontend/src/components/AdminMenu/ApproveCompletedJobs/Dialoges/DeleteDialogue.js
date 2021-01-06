import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export function DeleteDialogue({ jobInstanceToDelete, setJobInstanceToDelete, onDeleteJobInstance }) {
  return (
    <Dialog
      open={jobInstanceToDelete !== null}
      onClose={() => setJobInstanceToDelete(null)}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <h2>Are you sure?</h2>


      <DialogActions>
        <button className={"site-button secondary-button"} onClick={() => setJobInstanceToDelete(null)} color="secondary">
          Cancel
        </button>

        <button
          className={"site-button primary-button"}
          color="primary"
          onClick={onDeleteJobInstance}
        >
          Delete
        </button>

      </DialogActions>

    </Dialog>
  );
}
