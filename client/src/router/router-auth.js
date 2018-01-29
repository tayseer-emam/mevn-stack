import { store } from '@/store/store'

export const ifAuth = (to, from, next) => {
  if(store.state.user.isLoggedIn) {
    next();
  } else {
    next({name: 'login'});
  }
}

export const ifNotAuth = (to, from, next) => {
  if(!store.state.user.isLoggedIn) {
    next();
  } else {
    next(false);
  }
}