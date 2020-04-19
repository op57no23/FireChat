import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Router from 'vue-router'
import firebase from 'firebase/app'
import Vue from 'vue'

Vue.use(Router)

const routes = [{
        path: '/chat',
        name: 'chat',
        component: Layout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '*',
        redirect: '/login'
    }
]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    const loggedIn = firebase.auth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth && !loggedIn) next('login')
    else if (!requiresAuth && loggedIn) next('chat')
    else next()
})

export default router