import axios from 'axios';
import { useMutation } from 'react-query';

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post('http://localhost:5000/auth/api/login', {
    email,
    password,
  });
  return data;
};

export const useLogin = () => {
  return useMutation(login, {
    onSuccess: data => localStorage.setItem('token', JSON.stringify(data)),
  });
};
