import { useQuery } from 'react-query';
import axios from 'axios';

export const FetchRoutes = async () => {
    const config = {
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
    };
  
    const res = await axios.get(
      'https://fc7oadp240.execute-api.ap-south-1.amazonaws.com/map-app/get_route_from_db',
      config
    );
    return res.data;
  };