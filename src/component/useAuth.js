import { useQuery } from 'react-query';

const checkLoginStatus = async () => {
  const token = sessionStorage.getItem('token');
  if (token) return true;
  return false;
};

export default function useAuth() {
  return useQuery('authStatus', checkLoginStatus);
}
