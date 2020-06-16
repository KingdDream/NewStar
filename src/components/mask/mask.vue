<template>
    <div id="mask"></div>
</template>
<script>
    export default {
        data() {
            return {};
        },
        mounted() {

        },
        methods: {}
    };
</script>

<style scoped>
    #mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: rgba(0, 0, 0, 0.6);
    }

    
</style>