  
import Vue from "vue";
import VueRouter  from "vue-router";
import Home from "../components/Home";
import Login from "../components/users/Login"
import VueRouteMiddleware from 'vue-route-middleware'
import store from "../store";
Vue.use(VueRouter);

export const router = new VueRouter({
    mode: "history",
    routes: [
        { 
            path: "/login",
            name: 'login', 
            component: Login
        },
        { 
            path: "/", 
            name: 'home', 
            component: Home ,
            meta: {
                middleware: (to, from, next) => {
                    let auth = store.state.user.account
                    if(!auth){
                    next({ name: 'login' });
                    }
                }
            },
        }
    ]
})
router.beforeEach(VueRouteMiddleware());
