<template>
    <div class="flex-center position-ref full-height">
        <div class="top-right links">
            <router-link :to="{ name: 'home' }" v-if="isLoggedIn">Home</router-link>
            <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">Login</router-link>
            <!-- <router-link :to="{ name: 'register' }" v-if="!isLoggedIn">Register</router-link> -->
        </div>

        <div class="content">
            <div class="title m-b-md">
                Date Event
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                isLoggedIn : 'loginStatus',
                base_url : 'baseUrl'
            })
        }
    }
</script>
