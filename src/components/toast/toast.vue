<template>
    <div class="jh_toast">
        {{msg}}
    </div>
</template>

<script>
    export default {
        name: "toast",
        data() {
            return {
                msg: ''
            }
        }
    }
</script>

<style scoped>
    .jh_toast {
        position: fixed;
        z-index: 1000000;
        padding: 10px 15px;
        left: 50%;
        top: 80%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        color: #ffffff;
        font-size: 0.26rem;
        line-height: 0.34rem;
        max-width: 60%;
    }
</style>
