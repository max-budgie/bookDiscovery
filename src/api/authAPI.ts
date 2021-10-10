import ApiClient from './ApiClient';
import { Alert } from 'react-native';
import { serverURL } from '../config';
import { AxiosResponse } from 'axios';

const authApi = 'auth/';

export interface User {
  id: string;
  username: string;
  token: string;
}

const create = () => {
  const client = ApiClient(serverURL);

  const errorHandler = (response: AxiosResponse) => {
    if (response.status == 200) {
      return response.data;
    } else {
      setTimeout(
        () =>
          Alert.alert('Error', response?.data?.message || 'Unknown error!', [
            {
              text: 'OK',
            },
          ]),
        200
      );
    }
  };

  const register = (username: string, password: string) => {
    const URL = authApi + 'register';
    const params = {
      username,
      password,
    };
    return client.api.post(URL, params).then(errorHandler);
  };

  const login = (username: string, password: string) => {
    const URL = authApi + 'login';
    const params = {
      username,
      password,
    };
    return client.api.post(URL, params).then(errorHandler);
  };

  return {
    register,
    login,
  };
};

export default {
  create,
};
