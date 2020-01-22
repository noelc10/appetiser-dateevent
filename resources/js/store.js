import Vue from 'vue';
import Vuex from 'vuex';
import { router } from './routes.js';
import { BASE_URL } from './config.js';
import { getLocalUser } from './components/helpers/auth';

Vue.use(Vuex);

const user = getLocalUser();

export const store = new Vuex.Store({
    state : {
        isLoading: false,
        isLoggedin: !!user,
        user: user,
        base_url: `${ BASE_URL }`,
        axios_config : {},
        auth_error: null,
    },
    actions : {
        reAuth: (context) => {
            if (localStorage.getItem('appetiser-dateevent.user') != null) {
                let user =  JSON.parse(localStorage.getItem('appetiser-dateevent.user'));
                context.commit('saveUser', user);

                context.commit('loginUser');
                let token = localStorage.getItem('appetiser-dateevent.token');

                let config = {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'Bearer ' + token
                    }
                };

                context.commit('setAxiosConfig', config);

                axios.interceptors.request.use(
                    (config) => {
                        let token = localStorage.getItem('appetiser-dateevent.token');

                        if (token) {
                            config.headers['Authorization'] = `Bearer ${ token }`;
                            config.headers['Content-Type'] = `application/json`;
                        }

                        return config;
                    }, (error) => {
                        return Promise.reject(error);
                    }
                );
            }
        },
        login: (context) => {
            context.commit('login');
        },
        logout: (context) => {
            let user =  JSON.parse(localStorage.getItem('appetiser-dateevent.user'));

            axios.post(context.getters.baseUrl + 'api/v1/auth/logout', {id : user.id}, {"headers" : context.getters.axiosConfig.headers }).then(response => {
                    localStorage.removeItem("appetiser-dateevent.token");
                    localStorage.removeItem("appetiser-dateevent.user");

                    context.commit('logoutUser');
                    context.commit('saveUser', null);

                    router.push('/');
                }).catch(error=>{
                    console.log(error);
                });
        }
    },
    getters : {
        user: state => {
            return state.user;
        },
        axiosConfig: state => {
            return state.axios_config;
        },
        loginStatus: state => {
            return state.isLoggedin;
        },
        baseUrl: state => {
            return state.base_url;
        },
        authError: state => {
            return state.auth_error;
        },
    },
    mutations : {
        loginUser: state => {
            state.isLoggedin = true;
        },
        logoutUser: state => {
            state.isLoggedin = false;
            state.user = null;
        },
        saveUser: (state, user) => {
            state.user = user;
        },
        setLoading: (state, isLoading) => {
            state.isLoading = true;
        },
        unsetLoading: (state, isLaoding) =>{
            state.isLoading = false
        },
        login: (state) => {
            state.isLoading = true;
            state.auth_error = null;
        },
        loginSuccess: (state, payload) => {
            state.auth_error = null;
            state.isLoggedin = true;
            state.isLoading = true;
            state.user = Object.assign({}, payload.user, {token: payload.access_token});

            console.log('user', Object.assign({}, payload.user, {token: payload.access_token}));

            localStorage.setItem('appetiser-dateevent.user', state.user);
        },
        loginFailed: (state, payload) => {
           state.loading = false;
           state.auth_error = payload.error;
        },
        logout: (state) => {
            localStorage.removeItem('appetiser-dateevent.user');
            state.isLoggedin = false;
            state.user = null;
        }
    }
});
