import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectIngredientsList } from '../../store/slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredientData = useAppSelector(selectIngredientsList).find(
    (item) => item._id === useParams().id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
