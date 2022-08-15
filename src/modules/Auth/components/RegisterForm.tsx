import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, IconButton, InputAdornment, Stack } from '@mui/material';
import { setToken } from 'common/localStorage';
import { useAppDispatch } from 'common/redux';
import { RHFTextInput } from 'components';
import { AUTH_STATUS, BUTTON } from 'constants/common';
import { actionsAuth, IRegisterForm, useSelectAuthStore } from 'modules/Auth';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, stackCallback } from 'utils';
import { schemaValidateSignUp } from '../schema';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirm: ''
};

export const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelectAuthStore();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSubmit = async (data: IRegisterForm) => {
    await dispatch(actionsAuth.register(data))
      .unwrap()
      .then(({ data }) => {
        setToken(data.token);
        enqueueSnackbar(AUTH_STATUS.LOGIN_SUCCESS);
        stackCallback(() => redirect('/account/quiz'));
      })
      .catch(err =>
        enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' })
      );
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const { control, handleSubmit } = useForm<IRegisterForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaValidateSignUp)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Stack spacing={2.5}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextInput
            id="firstName"
            name="firstName"
            label="First name"
            variant="outlined"
            fullWidth
            disabled={loading === 'pending'}
            control={control}
          />

          <RHFTextInput
            id="lastName"
            name="lastName"
            label="Last name"
            variant="outlined"
            fullWidth
            disabled={loading === 'pending'}
            control={control}
          />
        </Stack>
        <RHFTextInput
          id="email"
          name="email"
          label="Email address"
          variant="outlined"
          fullWidth
          disabled={loading === 'pending'}
          control={control}
        />
        <RHFTextInput
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          control={control}
          fullWidth
          disabled={loading === 'pending'}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  onMouseDown={handleMouseDownPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading === 'pending'}
        >
          {BUTTON.SUBMIT}
        </Button>
      </Stack>
    </form>
  );
};
