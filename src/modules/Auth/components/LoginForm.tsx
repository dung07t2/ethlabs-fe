import { yupResolver } from '@hookform/resolvers/yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Stack
} from '@mui/material';
import { setToken } from 'common/localStorage';
import { RHFCheckbox, RHFTextInput } from 'components';
import { AUTH_STATUS, BUTTON } from 'constants/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ILoginForm, useSelectAuthStore } from 'modules/Auth';
import { schemaValidateSignIn } from 'modules/Auth/schema';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, stackCallback } from 'utils';

const defaultValues = {
  email: '',
  password: '',
  remember: true
};

export const LoginForm: React.FC = () => {
  const { loading } = useSelectAuthStore();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const auth = getAuth();

  const onSubmit = async (data: ILoginForm) => {
    // await dispatch(actionsAuth.login(data))
    //   .unwrap()
    //   .then(({ data }) => {
    //     setToken(data.token);
    //     enqueueSnackbar(AUTH_STATUS.LOGIN_SUCCESS);
    //     stackCallback(() => redirect('/account/dashboard'));
    //   })
    //   .catch(err =>
    //     enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' })
    //   );

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(async userCredential => {
        // Signed in
        // const user = userCredential.user;
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken();
          setToken(token);
          enqueueSnackbar(token);
        }
        enqueueSnackbar(AUTH_STATUS.LOGIN_SUCCESS);
        stackCallback(() => redirect('/account/dashboard'));
      })
      .catch(error => {
        enqueueSnackbar(AUTH_STATUS.LOGIN_FAILED, { variant: 'error' });
      });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const { control, handleSubmit } = useForm<ILoginForm>({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaValidateSignIn)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Stack spacing={2.5}>
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <RHFCheckbox
            id="remember"
            name="remember"
            label="Remember me"
            control={control}
          />
          <Link href="/forgot-password">
            <MuiLink
              component="a"
              variant="subtitle2"
              underline="hover"
              href="/forgot-password"
            >
              Forgot password?
            </MuiLink>
          </Link>
        </Stack>

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
