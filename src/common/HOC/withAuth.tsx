import { getToken, removeToken } from 'common/localStorage';
import { useAppDispatch } from 'common/redux';
import { isEmpty } from 'lodash';
import { actionsAuth, useSelectCurrentUserStore } from 'modules/Auth';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { redirect } from 'utils';

const PATH_EXCLUDED_AUTHENTICATION = ['/login'];

const withAuth = WrappedComponent => {
  return props => {
    const { pathname } = useRouter();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [verified, setVerified] = useState<boolean>(false);
    const currentUser = useSelectCurrentUserStore();

    /**
     * getCurrentUserAfterLogin
     * @param token
     * @returns
     */
    const getCurrentUserAfterLogin = useCallback(
      token => {
        if (!isEmpty(currentUser)) return setVerified(true);

        // Call getCurrentUser API
        dispatch(actionsAuth.getCurrentUser(token))
          .unwrap()
          .then(res => {
            if (isEmpty(res?.data)) return;
            return setVerified(true);
          })
          .catch(err => {
            enqueueSnackbar('Error, Token expired!', { variant: 'error' });
            removeToken();
            redirect('/login');
          });
      },
      [dispatch, currentUser, enqueueSnackbar]
    );

    useEffect(() => {
      (async () => {
        const accessToken = await getToken();
        const isExist = PATH_EXCLUDED_AUTHENTICATION.includes(pathname);

        // if no accessToken was found,then we redirect to "/" page.
        if (!accessToken) {
          redirect('/login');
          isExist && setVerified(true);
        } else {
          if (isExist) return redirect('/account/dashboard');
          getCurrentUserAfterLogin(accessToken);
        }
      })();
    }, [pathname, getCurrentUserAfterLogin]);

    /**
     * Return
     */
    if (!verified) return null;
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
