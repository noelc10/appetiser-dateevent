
import Router from 'vue-router';

export const router = new Router({
    mode : "history",
    routes : [
        {
            path    :   "/",
            name    :   "index",
            component   :   require("./components/Home.vue").default,
            meta    :   { guest: true }
        },
        // {
        //     path    :   "/home",
        //     name    :   "home",
        //     component   :   require("./components/Home.vue").default,
        //     meta    :   { layout: "default", auth: true }
        // },
        // {
        //     path    :   "/login",
        //     name    :   "login",
        //     component   :   require("./components/auth/Login.vue").default,
        //     meta    :   { layout: "default", guest: true }
        // },
        // {
        //     path    :   "/register",
        //     name    :   "register",
        //     component   :   require("./components/auth/Register.vue").default,
        //     meta    :   { layout: "default", guest: true }
        // },
    ]

});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.guest)) {
        next();
    } else if (to.matched.some(record => record.meta.auth )) {
        if (localStorage.getItem('appetiser-dateevent.user') == null) {
            next({name : "login"});
        } else {
            next();
        }
    } else {
        next();
    }
});
