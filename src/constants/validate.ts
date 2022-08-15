import { handleOutputLimitMessage } from 'utils';
import { FILE } from './common';

export const VALID = {
  FIELD_REQUIRED: 'The field is required',

  FIRST_NAME_REQUIRED: 'First Name is required',
  LAST_NAME_REQUIRED: 'Last Name is required',

  EMAIL_REQUIRED: 'Email is required',
  EMAIL_FORMAT: 'Email must be a valid email address',

  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_CONFIRM_REQUIRED: 'Password Confirm is required',
  PASSWORD_NOT_MATCH: 'Passwords must match',
  PASSWORD_FORMAT:
    'Must Contain 8 Characters.\nOne Uppercase.\nOne Lowercase.\nOne Number and one special case Character',
  PASSWORD_REG:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,

  MESSAGE_REQUIRED: 'Message is required',

  MAX_LENGTH_4: handleOutputLimitMessage(4),
  MAX_LENGTH_50: handleOutputLimitMessage(50),

  MIN_LENGTH_2: handleOutputLimitMessage(2, 'min'),
  MIN_LENGTH_8: handleOutputLimitMessage(8, 'min'),

  DATE_BETWEEN: "End date can't be before Start date",
  INPUT_TYPE_NUMBER: 'Amount must be a number',

  FILE_LIMIT: `File is larger than ${(FILE.LIMIT / 1048576).toFixed()}MB`
};
