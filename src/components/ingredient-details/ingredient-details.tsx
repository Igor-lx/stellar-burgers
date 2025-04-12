import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIngredientsList } from '../../store/slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  const id = useParams().id;

  const ingredientData = useAppSelector(selectIngredientsList).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
