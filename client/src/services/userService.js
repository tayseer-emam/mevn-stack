import api from './api'

export default {
  signUp(user) {
    return api().post('user/signup', user)
  },
  signIn(user) {
    return api().post('user/signin', user)
  },
  updateInfo(user) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' }}
    return api().put('user/updateInfo', user, config)
  },
  resetPassword(user) {
    return api().put('user/resetPassword', user);
  },
  checkAuth(user) {
    return api().get('user/checkAuth', user);
  }
}