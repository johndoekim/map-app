import { useQuery } from 'react-query';

const checkLoginStatus = async () => {
  const token = sessionStorage.getItem('token');
  if (token) return true;
  return false;
};

export default function useAuth() {
  const { data, refetch } = useQuery('authStatus', checkLoginStatus);
  return { isLogin: data, refetch };
}
