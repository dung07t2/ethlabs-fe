export enum API_STATUS {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'falied'
}
export const APP_STATUS = {
  UPLOAD_FAILED: 'Upload file failed!'
};

export const AUTH_STATUS = {
  LOGIN_SUCCESS: 'Login successfull!',
  LOGIN_FAILED: 'Login failed!',
  REGISTER_SUCCESS: 'Register successfull!',
  REGISTER_FAILED: 'Register failed!'
};

export const USER_STATUS = {
  ADD_USER_SUCCESS: 'Add User successfull!',
  ADD_USER_FAILED: 'Add User failed!',
  REMOVE_USER_FAILED: 'Remove User failed!',
  REMOVE_USER_SUCCESS: 'Remove User successfull!',
  UPDATE_USER_SUCCESS: 'Update User successfull!',
  UPDATE_USER_FAILED: 'Update User failed!'
};

export const ACTION_STATUS = {
  DELETE_SUCCESS: 'Delete successfull!',
  DELETE_FAILED: 'Delete failed!',
  CREATE_SUCCESS: 'Create successfull!',
  CREATE_FAILED: 'Create failed!'
};

export const BUTTON = {
  ADD_NEW_QUIZ: 'Add New Quiz',
  CANCEL: 'Cancel',
  CLOSE: 'Close',
  PREVIEW: 'Preview',
  SUBMIT: 'Submit',
  SAVE: 'Save',
  UPDATE: 'Update',
  BACK: 'Back',
  RESET_PASSWORD: 'Reset Password',
  ADD_AN_IMAGE: 'Add An Image',
  ADD_NEW_USER: 'Add New User',
  CLEAR_AND_RESET: 'Clear and Reset'
};

export const MODAL = {
  ADD_NEW_QUESTION: 'Add Questions/Results',
  EDIT_QUESTION: 'Edit Questions/Results',
  DISCARD_CHANGE_TITLE: 'Discard Changes',
  DISCARD_CHANGE_CONTENT:
    'You have unsaved changes. Do you want to discard your changes?',
  CONFIRM_DELETE_TITLE: 'Confirm Delete',
  CONTENT_MODAL_USER_REMOVE:
    'Are to sure you want to permanently delete the user?',
  CONTENT_MODAL_QUIZ_REMOVE:
    'Are to sure you want to permanently delete the quiz?'
};

export const NO_DATA = 'No data to display.';

export const FILE = {
  TYPE: 'FILE_TYPE',
  ACCEPT: process.env.uploadAcceptType || 'image/jpeg, image/png',
  LIMIT: (process.env.uploadSizeLimit as any) || 2097152,
  STATUS: {
    UPLOAD_FAILD: 'Upload failed!'
  }
};
