<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-5">
        <div class="container">
            <router-link :class="'navbar-brand'" :to="{ name: 'index' }">Appetiser Date Event</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">

                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <li class="nav-item" v-if="!isLoggedIn">
                        <router-link :class="'nav-link'" :to="{ name: 'login' }">Login</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link :class="'nav-link'" :to="{ name: 'register' }">Register</router-link>
                    </li> -->
                    <li class="nav-item dropdown" v-if="isLoggedIn">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-if="isLoggedIn">
                             <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <button :class="'dropdown-item'" :to="{ name: 'logout' }" @click="logout">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                user: null
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn : 'loginStatus',
                base_url : 'baseUrl',
                loggedInUser: 'user',
            })
        },
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push({name: 'login'})
            }
        }
    }
</script>
