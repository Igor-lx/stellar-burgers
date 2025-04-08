import { ConstructorPage, Feed, NotFound404 } from '@pages';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '../app-header';
import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import styles from './app.module.css';

const App = () => (
  <div className={styles.app}>
    <AppHeader />

    <Routes>
      {/* Обычные роуты*/}
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />

      {/* Обычные роуты модалок */}
      <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/ingredients/:id' element={<IngredientDetails />} />

      {/* ЗАЩИТИТЬ*/}
      <Route path='/login' element={<div>Login</div>} />
      <Route path='/register' element={<div>Register</div>} />
      <Route path='/forgot-password' element={<div>ForgotPassword</div>} />
      <Route path='/reset-password' element={<div>ResetPassword</div>} />
      <Route path='/profile' element={<div>Profile</div>} />
      <Route path='/profile/orders' element={<div>ProfileOrders</div>} />

      {/* ЗАЩИТИТЬ модалки */}
      <Route path='/profile/orders/:number' element={<OrderInfo />} />

      <Route path='*' element={<NotFound404 />} />
    </Routes>

    {/* Модалки в зависимости от бэкграунда */}
    <Routes>
      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
