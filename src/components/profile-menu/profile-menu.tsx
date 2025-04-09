import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../store/hooks';
import { deleteCookie } from '../../utils/cookie';
import { signOut } from '../../store/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await dispatch(signOut()).unwrap();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
      navigate('/login');
    } catch (error) {
      throw new Error('Ошибка');
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
