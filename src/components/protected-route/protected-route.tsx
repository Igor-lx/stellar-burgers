import { useAppSelector } from '../../store/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIfAuth, selectUserData } from '../../store/slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  publicRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  publicRoute
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuth = useAppSelector(selectIfAuth);
  const user = useAppSelector(selectUserData);

  if (isAuth) {
    return <Preloader />;
  }

  const from = location.state?.from || '/';

  if (publicRoute && user) {
    return (
      <Navigate
        replace
        to={from}
        state={{ background: location.state?.from?.background ?? null }}
      />
    );
  }

  if (!publicRoute && !user) {
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
