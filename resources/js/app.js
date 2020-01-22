/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

import Vue from 'vue';
import Vuetify from 'vuetify';
import Router from 'vue-router';
import Vuex from 'vuex';
import datePicker from 'vue-bootstrap-datetimepicker';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';
import VeeValidate from 'vee-validate';
import VueToastr from 'vue-toastr';

import {router} from './routes';
import {store} from './store';

import App from './components/App.vue';
import Client from './components/layouts/Client.vue';
import Main from './components/Main.vue';

// window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(Router);
Vue.use(datePicker);
Vue.use(VueToastr);
Vue.use(VueMoment, {
    moment,
});
Vue.use(VeeValidate, {
    classes: true,
    classNames: {
        valid: '',
        invalid: 'is-invalid'
    }
});

Vue.component('App', App);
Vue.component('default-layout', Client);
Vue.component('main-layout', Main);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    }
});
