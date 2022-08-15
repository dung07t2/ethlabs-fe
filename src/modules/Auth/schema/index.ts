import { VALID } from 'constants/validate';
import * as Yup from 'yup';

// -- schemaValidateSignIn-------------------------------------------------
export const schemaValidateSignIn = Yup.object().shape({
  email: Yup.string().required(VALID.EMAIL_REQUIRED).email(VALID.EMAIL_FORMAT),
  password: Yup.string().required(VALID.PASSWORD_REQUIRED),
  remember: Yup.boolean().oneOf([true], 'Message')
});

// -- schemaValidateSignUp-------------------------------------------------
export const schemaValidateSignUp = Yup.object().shape({
  firstName: Yup.string()
    .required(VALID.FIRST_NAME_REQUIRED)
    .min(2, VALID.MIN_LENGTH_2)
    .max(12, VALID.MAX_LENGTH_50),
  lastName: Yup.string()
    .required(VALID.LAST_NAME_REQUIRED)
    .max(12, VALID.MAX_LENGTH_50),
  email: Yup.string()
    .required(VALID.EMAIL_REQUIRED)
    .email(VALID.EMAIL_FORMAT)
    .max(40, VALID.MAX_LENGTH_50),
  password: Yup.string()
    .required(VALID.PASSWORD_REQUIRED)
    .min(8, VALID.MIN_LENGTH_8)
    .max(20, VALID.MAX_LENGTH_50)
    .matches(VALID.PASSWORD_REG, VALID.PASSWORD_FORMAT),
  passwordConfirm: Yup.string()
    .required(VALID.PASSWORD_REQUIRED)
    .test('passwords-match', VALID.PASSWORD_NOT_MATCH, function (value) {
      return this.parent.password === value;
    })
});
// -- schemaValidateForgotPassword-------------------------------------------------
export const schemaValidateForgotPassword = Yup.object().shape({
  email: Yup.string().required(VALID.EMAIL_REQUIRED).email(VALID.EMAIL_FORMAT)
});
