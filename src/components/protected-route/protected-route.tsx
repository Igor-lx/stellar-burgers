import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Preloader } from '../ui';

export type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  publicRoute: anonymous = false
}) => {
  const isLoggedIn = useAppSelector((state) => state.user.ifAuth);
  const isLoading = useAppSelector((state) => state.user.loading);
  const isAuthChecked = useAppSelector((state) => state.user.userChecked);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (!isAuthChecked || isLoading) {
    return <Preloader />;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
