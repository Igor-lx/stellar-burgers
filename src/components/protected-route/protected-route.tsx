import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  publicRoute
}) => {
  const location = useLocation();
  const { userData } = useAppSelector((state) => state.user);

  if (publicRoute && userData) {
    // const from = location.state?.from || '/';
    return (
      <Navigate
        replace
        to='/'
        state={{ background: location.state?.background ?? null }}
      />
    );
  }

  if (!publicRoute && !userData) {
    const { background } = location.state ?? {};
    return (
      <Navigate
        replace
        to='/login'
        state={{
          from: {
            ...location,
            background,
            state: null
          }
        }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
