import { CacheProvider } from '@emotion/react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from 'common/redux';
import { Notications } from 'components';
import { config } from 'config/config';
import { initializeApp } from 'firebase/app';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import 'styles/main.scss';
import ThemeConfig from 'themes';
import GlobalStyles from 'themes/globalStyles';
import { createEmotionCache } from 'utils';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

initializeApp(config.firebaseConfig);

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? (page => page);
  // Create a client
  const queryClient = new QueryClient();

  return (
    <CacheProvider value={emotionCache}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeConfig>
          <GlobalStyles />
          <Toaster position="top-center" />
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <Notications>
                {getLayout(<Component {...pageProps} />)}
              </Notications>
            </QueryClientProvider>
          </Provider>
        </ThemeConfig>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
