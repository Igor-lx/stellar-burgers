import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Preloader } from '../ui';

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  publicRoute
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { loading, userData } = useAppSelector((state) => state.user);

  if (loading) {
    return <Preloader />;
  }

  if (publicRoute && userData) {
    return (
      <Navigate
        replace
        to='/'
        state={{ background: location.state?.from?.background ?? null }}
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
