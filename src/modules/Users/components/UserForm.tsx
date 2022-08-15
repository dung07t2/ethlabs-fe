import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormGroup,
  Grid,
  InputLabel,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { getToken } from 'common/localStorage';
import { useAppDispatch } from 'common/redux';
import { RHFTextInput, RHFUpload } from 'components';
import { BUTTON, FILE, USER_STATUS } from 'constants/common';
import { isEmpty, isString } from 'lodash';
import { actionsApp } from 'modules/App';
import {
  actionsUser,
  IUser,
  schemaValidateAddUser,
  useSelectUserFormState,
  useSelectUsersStore
} from 'modules/Users';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';

export const defaultValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  avatar: ''
};
interface UserFormProps {
  userId: any;
}
export const UserForm: React.FC<UserFormProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { entities } = useSelectUsersStore();
  const { isAdd } = useSelectUserFormState();

  const currentUser = entities.find(user => user._id === userId);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<IUser>({
    defaultValues: isAdd ? defaultValues : currentUser,
    resolver: isAdd ? yupResolver(schemaValidateAddUser) : undefined
  });

  /**
   * Handle upload
   */
  const handleUploadApi = file => {
    if (isEmpty(file) || isString(file) || errors?.avatar) return;
    const token = getToken();

    dispatch(actionsApp.upload({ token: token, data: file[0] }))
      .unwrap()
      .then(({ data }) => data && setValue('avatar', data.path))
      .catch(() =>
        enqueueSnackbar(FILE.STATUS.UPLOAD_FAILD, { variant: 'error' })
      );
  };

  /**
   * onSubmit
   * @param data
   * @returns void
   */
  const onSubmit = async (data: IUser) => {
    if (isEmpty(data)) return;
    const token = getToken();
    if (isAdd) {
      await dispatch(actionsUser.addUser({ token: token, data: data }))
        .unwrap()
        .then(res => {
          if (!res.data) return;
          enqueueSnackbar(res.message);
          handleActions({ isShow: false });
          dispatch(actionsUser.fetchUsers(token));
        })
        .catch(err =>
          enqueueSnackbar(USER_STATUS.ADD_USER_FAILED, { variant: 'error' })
        );
    } else {
      await dispatch(
        actionsUser.updateUser({
          token: token,
          data: data,
          userId: userId
        })
      )
        .unwrap()
        .then(res => {
          if (!res.data) return;
          enqueueSnackbar(USER_STATUS.UPDATE_USER_SUCCESS);
          handleActions({ isShow: false, isAdd: true });
          dispatch(actionsUser.fetchUsers(token));
        })
        .catch(err =>
          enqueueSnackbar(USER_STATUS.UPDATE_USER_FAILED, { variant: 'error' })
        );
    }
  };

  const handleActions = (config: any) => {
    dispatch(actionsUser.updateQuizActions(config));
  };
  return (
    <Grid container spacing={2} justifyContent="center" mt={5}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography component="h1" variant="h5" align="center" mb={4}>
            {`${isAdd ? 'Add New' : 'Edit'} User`}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormGroup>
                  <InputLabel htmlFor="first_name">First Name*</InputLabel>
                  <RHFTextInput
                    size="small"
                    id="first_name"
                    name="first_name"
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter First Name"
                    control={control}
                    fullWidth
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <InputLabel htmlFor="last_name">Last Name*</InputLabel>
                  <RHFTextInput
                    size="small"
                    id="last_name"
                    name="last_name"
                    margin="normal"
                    variant="outlined"
                    placeholder="Enter Last Name"
                    control={control}
                    fullWidth
                  />
                </FormGroup>
              </Grid>
              {isAdd && (
                <>
                  <Grid item xs={12}>
                    <FormGroup>
                      <InputLabel htmlFor="email">Email*</InputLabel>
                      <RHFTextInput
                        size="small"
                        id="email"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        placeholder="Enter Email"
                        control={control}
                        fullWidth
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <FormGroup>
                      <InputLabel htmlFor="password">Password*</InputLabel>
                      <RHFTextInput
                        size="small"
                        id="password"
                        name="password"
                        margin="normal"
                        variant="outlined"
                        placeholder="Enter Password"
                        type="password"
                        control={control}
                        fullWidth
                      />
                    </FormGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <FormGroup>
                      <InputLabel htmlFor="passwordConfirm">
                        Password Comfirm*
                      </InputLabel>
                      <RHFTextInput
                        size="small"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        margin="normal"
                        variant="outlined"
                        placeholder="Enter Password Comfirm"
                        type="password"
                        control={control}
                        fullWidth
                      />
                    </FormGroup>
                  </Grid>
                </>
              )}

              <Grid item xs={12}>
                <FormGroup>
                  <InputLabel htmlFor="avatar">Avatar</InputLabel>
                  <RHFUpload
                    id="avatar"
                    name="avatar"
                    control={control}
                    onChangeCb={file => handleUploadApi(file)}
                  />
                </FormGroup>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center" mt={4}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ justifyContent: 'cener' }}
                >
                  <Button
                    type="button"
                    color="inherit"
                    variant="contained"
                    onClick={() =>
                      handleActions({ isShow: false, isAdd: true })
                    }
                  >
                    {BUTTON.CANCEL}
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disabled={!isAdd && (!isDirty || !isValid)}
                  >
                    {isAdd ? BUTTON.SUBMIT : BUTTON.UPDATE}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};
