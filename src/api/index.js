import authApi from './authAPI';
import bookApi from './bookAPI';

export const AuthApi = authApi.create();
export const BookApi = bookApi.create();
