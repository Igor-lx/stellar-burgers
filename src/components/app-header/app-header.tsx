import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useAppSelector } from '../../store/hooks';
import { selectUserName } from '../../store/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useAppSelector(selectUserName);
  return <AppHeaderUI userName={userName} />;
};
