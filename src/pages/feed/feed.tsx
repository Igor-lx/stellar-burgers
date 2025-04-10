import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchFeed,
  selectFeedStatus,
  selectOrdersFromFeed
} from '../../store/slices/feedpageSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(selectOrdersFromFeed);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const fetchStatus = useAppSelector(selectFeedStatus);

  if (fetchStatus === 'loading' || !orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
