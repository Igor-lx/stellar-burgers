import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '../../store/hooks';
import { signIn } from '../../store/slices/userSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(signIn({ email: email, password: password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
