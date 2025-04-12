import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useParams } from 'react-router';
import { selectFeedOrderByNumber } from '../../store/slices/feedpageSlice';
import { selectIngredientsList } from '../../store/slices/burgerIngredientsSlice';
import { fetchOrderByNumber } from '../../store/slices/feedpageSlice';

export const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();

  const ingredients: TIngredient[] = useAppSelector(selectIngredientsList);

  const number = Number(useParams().number);
  const orderData = useAppSelector(selectFeedOrderByNumber);

  useEffect(() => {
    dispatch(fetchOrderByNumber(number));
  }, [dispatch, number]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
