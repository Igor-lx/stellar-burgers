import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getOrdersHistoryThunk,
  selectOrdersHistory
} from '../../store/slices/ordersHistorySlice';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useAppSelector(selectOrdersHistory);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrdersHistoryThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
