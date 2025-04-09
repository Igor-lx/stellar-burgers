import { BurgerConstructorUI } from '@ui';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectConstructorItems } from '../../store/slices/burgerConstructorSlice';
import {
  selectOrderLoading,
  selectOrder,
  fetchOrder,
  clearOrder
} from '../../store/slices/orderSlice';
import { selectUserData } from '../..//store/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const constructorItems = useAppSelector(selectConstructorItems);
  const orderRequest = useAppSelector(selectOrderLoading);
  const orderModalData = useAppSelector(selectOrder);
  const user = useAppSelector(selectUserData);

  const bun = constructorItems.bun;
  const ingredients = constructorItems.ingredients;

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const orderIngredientIds = useMemo(() => {
    if (!bun) return [];
    return [bun._id, ...ingredients.map((item) => item._id), bun._id];
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || orderRequest) return;

    dispatch(fetchOrder(orderIngredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
