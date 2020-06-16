<template>
    <div class="setOrganization">
        <div>
            <span class="A">名称:</span>
            <input value="" v-model="Organization.name">
        </div>
        <div>
            <span class="A">描述:</span>
            <input value="" v-model="Organization.description">
        </div>
        <div>
            <span @click="confirm">确定</span>
            <span @click="cancel">取消</span>
        </div>
    </div>
</template>
<script>
    import { modifyGroup, } from "../../request/api"
    export default {
        data() {
            return {};
        },
        props: ['Organization',],
        mounted() {

        },
        //钩子函数在Vue 实例销毁后调用
        destroyed() {
            this.$bus.off("cancelMask")
        },
        methods: {
            modifyGroup() {
                let data = {
                    description: this.Organization.description,
                    name: this.Organization.name,
                    id: this.Organization.id
                }
                modifyGroup(data).then(res => {

                })
            },
            confirm() {
                this.modifyGroup()
                this.$emit('cancelMask')
            },
            cancel() {
                this.$emit('cancelMask')
            }
        }
    };
</script>

<style scoped>
    .setOrganization {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -150px;
        margin-left: -200px;
        width: 400px;
        height: 300px;
        z-index: 99999;
        background: rgba(36, 48, 50, 1);
    }


    input {
        width: 100%;
        height: 32px;
        background: rgba(0, 217, 255, 0.4);
        border: 1px solid rgba(0, 0, 0, 0.14);
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        border-radius: 4px;
        padding-left: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .A {
        display: block;
        font-size: 16px;
        color: rgba(0, 217, 255, 1) !important;
        margin-bottom: 15px;
    }

    .setOrganization>div {
        padding: 20px 20px 10px;
        box-sizing: border-box;

    }

    .setOrganization>div:nth-child(3) {
        display: flex;
        padding: 30px 20px;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .setOrganization>div:nth-child(3)>span {

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

    .setOrganization>div:nth-child(3)>span:nth-child(2) {
        background: rgba(0, 217, 255, 0.6);
    }
</style>