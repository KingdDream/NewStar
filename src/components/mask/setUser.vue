<template>
    <div class="setOrganization">
        <div>
            <span class="A">名称:</span>
        </div>
        <div>
            <div v-for="(item,index) in cities" :key="index">
                <el-checkbox v-model="item.show" :label="item.name"></el-checkbox>
            </div>
        </div>
        <div>
            <span @click="confirm(0)">确定</span>
            <span @click="confirm(1)">取消</span>
        </div>
    </div>
</template>
<script>
    import { listGroup, addUserGroup,removeGroupUser } from "../../request/api"
    export default {
        data() {
            return {
                //多选
                cities: [],
            };
        },
        props: ['id'],
        mounted() {
            this.listGroup(this.id[0].id)
        },
        //钩子函数在Vue 实例销毁后调用
        destroyed() {
            this.$bus.off("cancelMask")
        },
        methods: {
            listGroup(x) {
                let data = {
                    page: 1,
                    size: 999
                };
                listGroup(data).then(res => {
                    if (res.code == '000000') {
                        this.cities = []
                        res.result.list.forEach((y) => {
                            this.id[0].groupName.forEach((x) => {
                                if (x == y.name) {
                                    y.show = true
                                } 
                            });
                        })
                        res.result.list.forEach(item => {
                            if(!item.hasOwnProperty('show')){
                                item.show = false
                            }
                            this.cities.push(item);
                        });
                    }
                })
            },
            //删除组成员
            removeGroupUser(x,y){
                let data = {
                    group_id: x,
                    uids: y
                };
                removeGroupUser(data).then(res => {
                })
            },
            //添加组成员
            addUserGroup(x,y){
                let data = {
                    group_id: x,
                    uids: y
                };
                addUserGroup(data).then(res => {})
            },
            confirm(x) {
                if (x == 0) {
                    this.cities.forEach(item => {
                        if (item.show == true) {
                            this.addUserGroup(item.id, this.id[0].id)
                        } else {
                            this.removeGroupUser(item.id, this.id[0].id)
                        }
                    })
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

    .setOrganization /deep/ .el-checkbox__input.is-checked+.el-checkbox__label,
    .setOrganization /deep/ .el-checkbox {
        color: rgba(0, 217, 255, 1) !important;
    }
    .setOrganization>div:nth-child(1){
        height: 50px;
        padding:30px 40px;
        box-sizing: border-box;
    }
    .setOrganization>div:nth-child(2){
        height:200px;
        padding:10px 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        box-sizing: border-box;
    }
    .setOrganization>div:nth-child(2)>div{
        width: 33%;
        box-sizing: border-box;
    }

    .A {
        display: block;
        font-size: 16px;
        color: rgba(0, 217, 255, 1) !important;
    }

    .setOrganization>div:nth-child(3) {
        display: flex;
        padding:0 40px;
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