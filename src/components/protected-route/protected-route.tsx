import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  publicRoute: anonymous = false
}) => {
  const isLoggedIn = useAppSelector((store) => store.user.ifAuth);
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
