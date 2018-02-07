import axios from 'axios'
import { store } from '@/store/store'

export default () => {

  const api = axios.create({
    baseURL: 'http://localhost:8081/',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })

  api.interceptors.response.use(
    response => response.data,
    error => {
      if(error.response.status === 401) {
        store.dispatch('signOut');
      }
      return Promise.reject(error.response.data);
  });

  return api
}