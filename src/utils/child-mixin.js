import router from '@/router'
import store from '@/store'

const childMixin = {
  beforeRouteEnter (to, from, next) {
    if (store.getters.childMapping) {
      next()
    } else {
      store.dispatch('getMapping').then(() => {
        next()
      }).catch(() => router.push({
        path: '/404'
      }))
    }
  }
}

export {
  childMixin
}
