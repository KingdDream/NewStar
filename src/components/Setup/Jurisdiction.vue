<template>
    <div class="box">
        <div class="conversationLeft">

            <div class="table-list">
                <div class="table-head">
                    <span>ID</span>
                    <span>{{value==true?'用户':'组别'}}</span>
                    <span>{{value==true?'昵称':'人数'}}</span>
                    <span>创建时间</span>
                </div>
                <div class="table-child" v-for="(item,index) in cities" :key="index" @click="permissionsClick(item.id)">
                    <span>{{item.id}}</span>
                    <span>{{value==true?item.username:item.name}}</span>
                    <span>{{value==true?item.nickname:item.userNum}}</span>
                    <span>{{item.createTime}}</span>

                </div>

            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
                :total="pageTotal">
            </el-pagination>
        </div>
        <div class="conversationRight">
            <div>
                <div class="title">{{value==true?'用户':'组别'}}权限</div>
                <div class="pag">
                    <span v-for="item in permissions" :mmm="item.state==true?1:0"
                        :class="item.state==true?'activeColor':''" @click="pagclick(item)">{{item.name}}</span>
                </div>
                <div class="btn">
                    <div><span>组别</span>
                        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"
                            @change="switchchange(value)">
                        </el-switch><span>用户</span>
                    </div>
                    <span class="center" @click="AddFn()">提交</span>
                </div>
            </div>
        </div>
        <masks v-if="maskShow"></masks>
        <confirmMask v-if="confirmMaskShow" @cancelUser="cancelUser" title="确认提交修改的权限吗？"></confirmMask>
    </div>
</template>

<script>
    import { listUsers, listGroup, findPermissionsByUID, addUserPermissions, delUserPermissions, findPermissionsGroup, addPermissonsGroup, delPermissionsGroup } from "../../request/api"
    export default {
        data() {
            return {
                value: true,
                permissions: [],
                cities: [],
                //分页
                currentPage: 1,
                pageSize: 9,
                pageTotal: 100,
                tableShow: false,
                //唯一id
                onlyId: 999999999,
                //添加权限
                addData: [],
                //删除权限
                cancelData: [],
                maskShow: false,
                confirmMaskShow: false,
            };
        },
        components: {
            masks: () => import("@/components/mask/mask"),
            confirmMask: () => import("@/components/mask/confirm"),
        },
        mounted() {
            if (this.value == true) {
                this.listUsers()
            } else {
                this.listGroup()
            }
        },
        methods: {
            //查询组别
            listGroup() {
                let data = {
                    page: this.currentPage,
                    size: this.pageSize
                };
                listGroup(data).then(res => {
                    if (res.code == '000000') {
                        this.cities = []
                        this.pageTotal = res.result.total;
                        res.result.list.forEach(item => {
                            this.cities.push(item);
                        });

                        if (this.cities.length > 0) {
                            this.findPermissionsGroup(this.cities[0].id)
                            this.onlyId = this.cities[0].id
                        }
                    }
                })
            },
            //查询人员
            listUsers() {
                let data = {
                    page: this.currentPage,
                    size: this.pageSize
                };
                listUsers(data).then(res => {
                    if (res.code == '000000') {
                        this.cities = []
                        this.pageTotal = res.result.total;
                        res.result.list.forEach(item => {
                            this.cities.push(item);
                        });
                        if (this.cities.length > 0) {
                            this.findPermissionsByUID(this.cities[0].id)
                            this.onlyId = this.cities[0].id
                        }
                    }
                })
            },
            //用户权限
            findPermissionsByUID(id) {
                let data = {
                    uid: id
                };
                findPermissionsByUID(data).then(res => {
                    if (res.code == '000000') {
                        this.permissions = []
                        this.addData = []
                        this.cancelData = []
                        res.result.forEach(item => {
                            item.idShow = true
                            if (item.state == true) {
                                this.cancelData.push(item)
                            }
                            this.permissions.push(item);
                        });

                    }
                })
            },
            //vuex设置权限
            vuexSetJurisdiction(id) {
                let data = {
                    uid: id
                };
                findPermissionsByUID(data).then(res => {
                    if (res.code == '000000') {
                        this.$store.commit('stateResult', res.result)
                    }
                })
            },

            //组权限
            findPermissionsGroup(id) {
                let data = {
                    gid: id
                };
                findPermissionsGroup(data).then(res => {
                    if (res.code == '000000') {
                        this.permissions = []
                        this.addData = []
                        this.cancelData = []
                        res.result.forEach(item => {
                            item.idShow = true
                            if (item.state == true) {
                                this.cancelData.push(item)
                            }
                            this.permissions.push(item);
                        });

                    }
                })
            },
            //添加用户权限
            addUserPermissions(x, y) {
                let data = {
                    pids: x,
                    uid: y
                };
                addUserPermissions(data).then(res => {

                })
            },
            //删除用户权限
            delUserPermissions(x, y) {
                let data = {
                    pids: x,
                    uid: y
                };
                delUserPermissions(data).then(res => {

                })
            },
            //添加组权限
            addPermissonsGroup(x, y) {
                let data = {
                    pids: x,
                    gid: y
                };
                addPermissonsGroup(data).then(res => {

                })
            },
            //删除组权限
            delPermissionsGroup(x, y) {
                let data = {
                    pids: x,
                    gid: y
                };
                delPermissionsGroup(data).then(res => {

                })
            },
            //切换权限列表 
            permissionsClick(id) {
                if (this.onlyId == id) {
                    return false
                }

                if (this.value == true) {
                    setTimeout(() => { this.findPermissionsByUID(id) }, 10)

                } else {
                    setTimeout(() => { this.findPermissionsGroup(id) }, 10)
                }

                this.onlyId = id
            },
            //添加权限
            pagclick(x) {
                x.state = !x.state
                x.idShow = !x.idShow
            },
            //删除用户
            AddFn() {
                this.maskShow = true
                this.confirmMaskShow = true
            },
            //修改权限
            cancelUser(x) {
                this.maskShow = false
                this.confirmMaskShow = false
                if (x == 0) {
                    this.addData = []
                    this.permissions.forEach(item => {
                        if (item.state == true && item.idShow == false) {
                            if (this.value == true) {
                                this.addUserPermissions(item.id, this.onlyId)
                            } else {
                                this.addPermissonsGroup(item.id, this.onlyId)
                            }
                        }
                    })

                    this.cancelData.forEach(item => {
                        if (item.state == false) {
                            if (this.value == true) {
                                this.delUserPermissions(item.id, this.onlyId)
                            } else {
                                this.delPermissionsGroup(item.id, this.onlyId)
                            }
                        }
                    })

                    setTimeout(() => {
                        this.vuexSetJurisdiction(this.$store.state.id)
                    },50)

                } else {

                }
            },
            //切换组别和用户
            switchchange(x) {
                if (x == true) {
                    this.listUsers()
                } else {
                    this.listGroup()
                }
            },

            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            }

        }
    };
</script>

<style scoped>
    .box {
        display: flex;
        width: 100%;
        height: 751px;
    }

    .conversationLeft {
        width: 880px;
        padding-left: 72px;
        padding-top: 29px;
        box-sizing: border-box;
        height: 751px;
    }

    .conversationRight {
        flex-grow: 1;
        padding-left: 64px;
        padding-top: 29px;
        box-sizing: border-box
    }

    .conversationRight>div {
        width: 640px;
        height: 686px;
        background: rgba(255, 255, 255, 0.05);
    }

    .conversationRight .title {
        height: 54px;
        font-size: 18px;
        font-weight: 400;
        line-height: 54px;
        padding-left: 32px;
        color: rgba(0, 217, 255, 0.8);
        border-bottom: 1px solid rgba(0, 217, 255, 0.4);
        box-sizing: border-box;
    }

    .conversationRight .pag {
        height: 549px;
        border-bottom: 1px solid rgba(0, 217, 255, 0.4);
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px 23px;
        box-sizing: border-box
    }

    .conversationRight .pag>span {
        display: block;
        margin: 10px;
        width: 128px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background: rgba(130, 130, 130, 0.2);
        color: rgba(206, 226, 229, 1);
        border-radius: 4px;
        cursor: pointer;
    }

    .conversationRight .pag>.activeColor {

        background: rgba(95, 204, 0, 0.7);
    }

    .conversationRight .btn {
        padding-top: 25px;
        display: flex;
        justify-content: flex-end;
        box-sizing: border-box
    }

    .conversationRight .btn>span {
        display: block;
        margin-left: 8px;
        margin-right: 32px;
        width: 83px;
        height: 32px;
        line-height: 32px;
        background: rgba(0, 217, 255, 0.6);
        border-radius: 4px;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
    }

    .conversationRight .btn>div {
        flex-grow: 1;
        color: rgba(0, 217, 255, 0.8);
        line-height: 32px;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .conversationRight .btn>div>span {
        padding: 0 10px;
        box-sizing: border-box;
    }

    .table-list {
        width: 100%;
        height: 539px;
        margin-bottom: 51px;
    }

    /* table */
    .table-head {
        height: 54px;
        background: rgba(0, 217, 255, 0.4);
        opacity: 1;
        border-radius: 4px 4px 0px 0px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 53px;
        color: rgba(0, 217, 255, 1);
        display: flex;
    }

    .table-child {
        height: 53px;
        border-bottom: 1px solid rgba(0, 217, 255, 0.4);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 53px;
        color: rgba(0, 217, 255, 0.6);
        display: flex;
    }

    .table-head>span,
    .table-child>span {
        display: block;
    }

    .table-child>span {
        cursor: pointer;
    }

    .table-head>span:nth-child(1),
    .table-child>span:nth-child(1) {
        width: 100px;
        padding-left: 60px;
    }

    .table-head>span:nth-child(3),
    .table-child>span:nth-child(3),
    .table-head>span:nth-child(2),
    .table-child>span:nth-child(2) {
        width: 200px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4) {
        width: 200px;
    }
</style>