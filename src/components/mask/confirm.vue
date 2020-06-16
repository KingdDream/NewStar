<template>
    <div class="setOrganization">
        <div>
            {{title}}
        </div>
        <div>
            <span @click="confirm(0)">确定</span>
            <span @click="confirm(1)">取消</span>
        </div>
        <span></span>
        <span></span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        props: ['title'],
        mounted() {

        },
        //钩子函数在Vue 实例销毁后调用
        // destroyed() {
        //     this.$bus.off("cancelMask")
        // },
        methods: {

            confirm(x) {
                this.$emit('cancelUser', x)
            },

        }
    };
</script>

<style scoped>
    .setOrganization {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -168px;
        margin-left: -309px;
        width: 618px;
        height: 336px;
        z-index: 99999;
        background: rgba(36, 48, 50, 1);
    }

    .setOrganization>div:nth-child(1) {
        text-align:center;
        height: 250px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 250px;
        color: rgba(0, 217, 255, 1);
        text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
        letter-spacing:6px;
    }

    .setOrganization>div:nth-child(2) {
        display: flex;
        padding:0 40px;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .setOrganization>div:nth-child(2)>span {

        width: 83px;
        height: 32px;
        background: rgba(0, 217, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;
        line-height: 32px;
    }

    .setOrganization>div:nth-child(2)>span:nth-child(2) {
        background: rgba(0, 217, 255, 0.6);
    }
</style>