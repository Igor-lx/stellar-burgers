import { useAppSelector } from '../../store/hooks';
import { Navigate, useLocation } from 'react-router-dom';
import { selectReady, selectUserData } from '../../store/slices/userSlice';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  protectedRoute?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  protectedRoute
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthChecked = useAppSelector(selectReady);
  const user = useAppSelector(selectUserData);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (protectedRoute && !user) {
    return (
      <Navigate
        replace
        to='/login'
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

  if (!protectedRoute && user) {
    return (
      <Navigate
        replace
        to={location.state?.from || '/'}
        state={{ background: location.state?.from?.background || null }}
      />
    );
  }

  return children;
};
