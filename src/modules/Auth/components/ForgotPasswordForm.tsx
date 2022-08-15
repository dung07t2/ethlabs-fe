import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { setToken } from 'common/localStorage';
import { useAppDispatch } from 'common/redux';
import { RHFTextInput } from 'components';
import { AUTH_STATUS, BUTTON } from 'constants/common';
import {
  actionsAuth,
  IForgotPasswordForm,
  useSelectAuthStore
} from 'modules/Auth';
import { schemaValidateSignIn } from 'modules/Auth/schema';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useForm } from 'react-hook-form';
import { redirect, stackCallback } from 'utils';

const defaultValues = {
  email: ''
};

export const ForgotPasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading } = useSelectAuthStore();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: IForgotPasswordForm) => {
    await dispatch(actionsAuth.forgotPassword(data))
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

  const { control, handleSubmit } = useForm<IForgotPasswordForm>({
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
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading === 'pending'}
        >
          {BUTTON.RESET_PASSWORD}
        </Button>
        <Link href="/login">
          <Button
            type="button"
            color="primary"
            fullWidth
            size="large"
            component="a"
          >
            {BUTTON.BACK}
          </Button>
        </Link>
      </Stack>
    </form>
  );
};
