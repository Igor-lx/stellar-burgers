import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../store/hooks';

import { signOut } from '../../store/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
