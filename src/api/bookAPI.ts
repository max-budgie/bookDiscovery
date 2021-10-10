import ApiClient from './ApiClient';
import { serverURL } from '../config';

const bookApi = 'books';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  pageCount: number;
  publisher: string;
  synopsis: string;
}

const getAuthHeader = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const create = () => {
  const client = ApiClient(serverURL);

  const getBooksList = (token: string, filter: string) => {
    const URL = bookApi + (filter ? `?q=${filter}` : '');
    return client.api.get(URL, undefined, getAuthHeader(token)).then((response) => response?.data?.books);
  };

  const getBook = (token: string, id: string) => {
    const URL = bookApi + '/' + id;
    return client.api.get(URL, undefined, getAuthHeader(token)).then((response) => response.data);
  };

  return {
    getBooksList,
    getBook,
  };
};

export default {
  create,
};
