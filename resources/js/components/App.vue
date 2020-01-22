<template>
    <div>
        <component :is="layout">
            <router-view></router-view>
        </component>
    </div>
</template>

<script>
    const defaultLayout = "main";

    export default {
        computed: {
            layout() {
                return (this.$route.meta.layout || defaultLayout) + "-layout";
            }
        }
    }
</script>
