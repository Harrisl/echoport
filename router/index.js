import Vue from 'vue'
import Router from 'vue-router'

// The meta data for your routes
const meta = require('./meta.json')

// Function to create routes
// Is default lazy but can be changed
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: resolve => import(`pages/${view}View.vue`).then(resolve)
  }
}

Vue.use(Router)

export function createRouter () {
    const router = new Router({
      base: __dirname,
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        {
          path: '/',
          name: 'home',
          component: resolve => import('pages/WelcomeView.vue').then(resolve)
        },
        {
          path: '/about',
          name: 'about',
          component: resolve => import('pages/AboutView.vue').then(resolve)
        },
        {
          path: '/events',
          name: 'event',
          component: resolve => import('pages/EventsView.vue').then(resolve)
        },
        {
          path: '/inspire',
          name: 'inspire',
          component: resolve => import('pages/InspireView.vue').then(resolve)
        },
        /*{ 
          path: '*',
           redirect: '/'
        }*/
        //route('/', 'Welcome'),
        //route('/inspire', 'Inspire'),
        // Global redirect for 404
        

      ]
    })

    // Send a pageview to Google Analytics
    router.beforeEach((to, from, next) => {
        if (typeof ga !== 'undefined') {
            ga('set', 'page', to.path)
            ga('send', 'pageview')
        }
        next()
    })

    return router
}
