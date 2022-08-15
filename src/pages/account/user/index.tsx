import { Button, Grid, Paper, Typography } from '@mui/material';
import { withAuth } from 'common/HOC';
import { getToken } from 'common/localStorage';
import { useAppDispatch } from 'common/redux';
import { EnhanceModal, Layout } from 'components';
import { BUTTON, MODAL, USER_STATUS } from 'constants/common';
import { isEmpty } from 'lodash';
import {
  actionsUser,
  UserForm,
  UserList,
  useSelectUserFormState
} from 'modules/Users';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const { isShow, isAdd } = useSelectUserFormState();

  useEffect(() => {
    const token = getToken();
    dispatch(actionsUser.fetchUsers(token));
  }, [dispatch]);

  const handleRemoveUser = async () => {
    if (isEmpty(userId)) return;
    const token = getToken();
    setShowModal(false);

    await dispatch(actionsUser.deleteUser({ token: token, data: userId }))
      .unwrap()
      .then(async res => {
        enqueueSnackbar(USER_STATUS.REMOVE_USER_SUCCESS);
        setUserId('');
        await dispatch(actionsUser.fetchUsers(token));
      })
      .catch(err =>
        enqueueSnackbar(USER_STATUS.REMOVE_USER_FAILED, { variant: 'error' })
      );
  };

  const handleActions = (isDelete: boolean, config: any) => {
    if (isDelete) {
      setUserId(config);
      setShowModal(true);
    } else {
      dispatch(actionsUser.updateQuizActions(config));
    }
  };

  return (
    <Layout title="Users" variant="auth">
      {isShow ? (
        <UserForm userId={!isAdd ? userId : ''} />
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item sm={6} lg={3}>
                    <Typography variant="h5">Users List</Typography>
                  </Grid>
                  <Grid item sm={4} md={3} lg={2}>
                    <Button
                      type="button"
                      color="primary"
                      variant="contained"
                      fullWidth
                      onClick={() => handleActions(false, { isShow: true })}
                    >
                      {BUTTON.ADD_NEW_USER}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <UserList
                onEditUser={userId => {
                  setUserId(userId);
                  handleActions(false, { isShow: true, isAdd: false });
                }}
                onRemoveUser={userId => handleActions(true, userId)}
              />
            </Grid>
          </Grid>
          <EnhanceModal
            title="Remove User"
            open={showModal}
            onCancel={hide => setShowModal(hide)}
            onOk={() => handleRemoveUser()}
            okText="Remove"
            cancelText="Cancel"
            variant="error"
          >
            {MODAL.CONTENT_MODAL_USER_REMOVE}
          </EnhanceModal>
        </>
      )}
    </Layout>
  );
};

export default withAuth(UserPage);
