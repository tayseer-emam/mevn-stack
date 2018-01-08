import api from './api'

export default {
  signUp(user) {
    return api().post('user/signup', user)
  },
  signIn(user) {
    return api().post('user/signin', user)
  }
}