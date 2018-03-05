import api from './api'

export default {
  post(post) {
    return api().post('/post', post);
  },
  getPosts() {
    return api().get('/post');
  },
  getPost(id) {
    return api().get(`/post/${id}`);
  },
  editPost(post) {
    return api().put(`/post`, post);
  }
}