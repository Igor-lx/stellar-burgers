import { FC, useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  useMatch,
  Routes,
  Route
} from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';
import { useAppDispatch } from '../../store/hooks';
import { fetchIngredients } from '../../store/slices/burgerIngredientsSlice';
import { fetchUser } from '../../store/slices/userSlice';
import { AppHeader } from '../app-header';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { ProtectedRoute } from '../protected-route';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const orderNumberFromFeed = useMatch('/feed/:number')?.params.number;
  const orderNumberFromProfile = useMatch('/profile/orders/:number')?.params
    .number;
  const orderNumber = orderNumberFromFeed || orderNumberFromProfile;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className='app'>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <div className='detailPageWrap'>
              <p className={`text text_type_digits-default detailHeader`}>
                {`#${orderNumber?.padStart(6, '0')}`}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute publicRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute publicRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute publicRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute publicRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className='detailPageWrap'>
                <p className={`text text_type_digits-default detailHeader`}>
                  {`#${orderNumber?.padStart(6, '0')}`}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <div className='detailPageWrap'>
              <p className={`text text_type_main-large detailHeader`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber?.padStart(6, '0')}`}
                onClose={closeModal}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber?.padStart(6, '0')}`}
                  onClose={closeModal}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
