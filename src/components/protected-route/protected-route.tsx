import { useAppSelector } from '../../store/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import {
  selectIfUserAuthenticated,
  selectUserInfo
} from '../../store/slices/userSlice';

type ProtectedRouteProps = {
  protectedRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  protectedRoute
}: ProtectedRouteProps) => {
  const location = useLocation();
  const ifUserAuthenticated = useAppSelector(selectIfUserAuthenticated); // Селектор
  const userInfo = useAppSelector(selectUserInfo); // Селектор

  if (!ifUserAuthenticated) {
    return <Preloader />;
  }

  if (protectedRoute && !userInfo) {
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }}
      />
    );
  }

  if (!protectedRoute && userInfo) {
    const from = location.state?.from || { pathname: '/' };
    const background = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ background }} />;
  }

  return children;
};
