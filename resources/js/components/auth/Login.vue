<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <form @submit.prevent="login">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input v-model="form.email" id="email" type="email" class="form-control" name="email" required autocomplete="email" autofocus>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input v-model="form.password" id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
                                </div>
                            </div>

                            <!-- <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" />

                                        <label class="form-check-label" for="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div> -->

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Login
                                    </button>

                                    <!-- <router-link :to="{ name: 'forgot_password' }" :class="'btn btn-link'">Forgot your Password?</router-link> -->
                                </div>
                            </div>

                            <div class="form-group row mb-0 mt-3">
                                <div class="col-md-8 offset-md-4">
                                    <p class="mt-2">
                                        Default Credentials:
                                        <br/>
                                        user@user.com
                                        <br/>
                                        1234
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { login } from './../helpers/auth';

    export default {
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                error: null
            }
        },
        methods: {
            login() {
                let creds = this.form;

                console.log('creds', creds);

                login(creds)
                .then((response) => {
                    this.$store.commit('loginSuccess', response);

                    this.form.email = '';
                    this.form.password = '';

                    this.$router.push({name: 'home'});
                }).catch((error) => {
                    this.$store.commit('loginFailed', {error});
                });
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn : 'loginStatus',
                base_url : 'baseUrl'
            })
        }
    }
</script>
