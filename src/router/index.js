import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import db from '@/firebase/init.js'
import store from '@/store/store.js'
import login from '@/components/login'
import editprofile from '@/components/edit-profile'
import profile from '@/components/profile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/editprofile',
      name: 'editprofile',
      component: editprofile,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/profile/:uname',
      name: 'profile',
      component: profile
    }
  ]
})

router.beforeEach((to,from,next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = store.state.user
    if (user) {
      next()
    }
    else {
      next({name:'login'})
      }
    }
    else {
      next()
  }
})

export default router
