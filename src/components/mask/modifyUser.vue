<template>
    <div class="setOrganization">
        <div>
            <span class="A">昵称:</span>
            <input value="" v-model="modify.nickname">
        </div>
        <div>
            <span class="A">手机:</span>
            <input value="" v-model="modify.mobile">
        </div>
        <div>
            <span class="A">邮箱:</span>
            <input value="" v-model="modify.email">
        </div>
        <div>
            <span @click="confirm(0)">确定</span>
            <span @click="confirm(1)">取消</span>
        </div>
    </div>
</template>
<script>
    import { changeUser  } from "../../request/api"
    export default {
        data() {
            return {
                //多选
                cities: [],
            };
        },
        props: ['modify'],
        mounted() {
            
        },
        //钩子函数在Vue 实例销毁后调用
        destroyed() {
            this.$bus.off("cancelMask")
        },
        methods: {
            
            //添加组成员
            changeUser() {
                console.log(this.modify.id)
                let data = {
                    email:this.modify.email,
                    id:this.modify.id,
                    mobile:this.modify.mobile,
                    nickname:this.modify.nickname,
                }
                changeUser(data).then(res => {

                })


            },
            //确定修改
            confirm(x) {
                if (x == 0) {
                    this.changeUser()
                }
                this.$emit('cancelMask')
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
    .setOrganization>div {
        padding:20px 40px;
        height:83px;
        box-sizing: border-box;
        display: flex;
    }
    .A {
        display: block;
        width:20%;
        height:32px;
        font-size: 14px;
        line-height: 32px;
        color: rgba(0, 217, 255, 1) !important;
    }
    .setOrganization>div:nth-child(4) {
        display: flex;
        padding:0 40px;
        box-sizing: border-box;
        justify-content: space-between;
    }

    .setOrganization>div:nth-child(4)>span {

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

    .setOrganization>div:nth-child(4)>span:nth-child(2) {
        background: rgba(0, 217, 255, 0.6);
    }
</style>