import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'src/store/hooks';
import { selectConstructorItems } from 'src/store/slices/burgerConstructorSlice';
import {
  selectOrderLoading,
  selectOrder,
  fetchOrder,
  clearOrder
} from 'src/store/slices/orderSlice';
import { selectUserData } from 'src/store/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useAppSelector(selectConstructorItems);
  const orderRequest = useAppSelector(selectOrderLoading);
  const orderModalData = useAppSelector(selectOrder);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUserData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    dispatch(
      fetchOrder([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => dispatch(clearOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return null;

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
