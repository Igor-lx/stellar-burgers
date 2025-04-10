import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editUserData, selectUserData } from '../../store/slices/userSlice';
import { Preloader } from '../../components/ui';

export const Profile: FC = () => {
  const user = useAppSelector(selectUserData);

  if (!user) {
    return <Preloader />;
  }

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useLayoutEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email,
        password: ''
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user.name ||
    formValue.email !== user.email ||
    !!formValue.password;

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(editUserData(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
