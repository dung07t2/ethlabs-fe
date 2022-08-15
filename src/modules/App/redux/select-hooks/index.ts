import { RootState } from 'common/redux';
import { useSelector } from 'react-redux';

export const useSelectAppLoaded = () =>
  useSelector<RootState, boolean>(state => state.app?.isLoaded);

export const useSelectAppToggleSidebar = () => {
  return useSelector<RootState, boolean>(state => state.app.isToggleSidebar);
};

export const useSelectAppStore = () => {
  return useSelector<RootState, any>(state => state.app);
};
