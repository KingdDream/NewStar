<template>

    <div class="conversationLeft">
        <div class="search-list">
            <div>
                <span>级别：</span>
                <input type="search" v-model="searchData" id placeholder="用户id" />
            </div>
            <div></div>
            <div></div>
            <div>
                <el-select v-model="value" placeholder="批量操作" @change="fnClick(value)">
                    <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="table-list">
            <div class="table-head">
                <span>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                    </el-checkbox>
                </span>
                <span>编号</span>
                <span>用户名</span>
                <span>部门</span>
                <span>短信告警</span>
                <span>邮箱告警</span>
                <span>最后登陆时间</span>
                <span>操作</span>
            </div>
            <div class="table-child" v-for="(item,index) in cities" :key="index">
                <span>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item" :key="index"></el-checkbox>
                    </el-checkbox-group>
                </span>
                <span>{{item.id}}</span>
                <span>{{item.username}}</span>
                <span>{{item.groupName.join(",")?item.groupName.join(","):'无'}}</span>
                <span>{{item.mobile?item.mobile:'无'}}</span>
                <span>{{item.email?item.email:'无'}}</span>
                <span>{{item.lastLoginTime}}</span>
                <span>
                    <span @click="modifyClick(item)">修改</span>
                </span>
            </div>
            <div class="table-child created-child" v-if="tableShow">
                <span></span>
                <span> <input value="" v-model="createdData.nickname" class="test" placeholder="昵称" /></span>
                <span>
                    <input value="" v-model="createdData.username" class="test" placeholder="用户名" />
                </span>
                <span>
                    <input value="" v-model="createdData.password" class="test" placeholder="密码" />
                </span>
                <span>
                    <el-select v-model="createdData.E" placeholder="组别" v-if="show">
                        <el-option v-for="(item,index) in options1" :key="index" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </span>
                <span>
                    <input value="mobile" v-model="createdData.mobile" placeholder="手机号">
                </span>
                <span>
                    <input value="" v-model="createdData.email" placeholder="邮箱">
                </span>

                <span>
                    <span @click="AddFn(1)">添加</span>
                    <span @click="AddFn(2)">取消</span>
                </span>
            </div>
            <div class="table-created" v-if="!tableShow">
                <span @click="AddFn(0)" style="cursor:pointer">+ 添加用户</span>
            </div>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
        <setMask v-if="setMaskShow" @cancelMask="cancelMask" :id="deleted"></setMask>
        <modifyMask v-if="modifyMaskShow" @cancelMask="cancelMask" :modify="modifyData"></modifyMask>
        <masks v-if="maskShow"></masks>
        <confirmMask v-if="confirmMaskShow" @cancelUser="cancelUser" title="确认删除选中的用户吗？"></confirmMask>
    </div>
</template>

<script>
    import { listGroup, searchUsers, listUsers, addUsers, changeUser, delUser, addUserGroup } from "../../request/api"
    export default {
        data() {
            return {
                options: [
                    {
                        value: 1,
                        label: "删除用户"
                    },
                    {
                        value: 2,
                        label: "更改部门"
                    }
                ],
                options1: [],
                value: "",
                value1: "",
                createdData: {
                    nickname: '',
                    username: '',
                    password: '',
                    E: '',
                    mobile: '',
                    email: '',
                },
                //批量删除
                cancelShow: false,
                show: true,
                //分页
                currentPage: 1,
                pageSize: 9,
                pageTotal: 100,
                //多选
                checkAll: false,
                checkedCities: [],
                cities: [],
                isIndeterminate: true,
                //选中结果
                deleted: [],
                tableShow: false,
                //遮罩层
                setMaskShow: false,
                modifyMaskShow: false,
                maskShow: false,
                confirmMaskShow: false,
                searchData: '',
                modifyData: null
            };
        },
        components: {
            setMask: () => import("@/components/mask/setUser"),
            modifyMask: () => import("@/components/mask/modifyUser"),
            masks: () => import("@/components/mask/mask"),
            confirmMask: () => import("@/components/mask/confirm"),
        },
        watch: {
            searchData: {
                handler(val) {
                    this.currentPage = 1
                    if (val == '') {
                        this.listUsers()
                    }
                    this.searchUsers();
                },
                deep: true //深度监听
            }
        },
        mounted() {
            this.listGroup()
            this.listUsers()
        },
        methods: {
            //查询组别
            listGroup() {
                let data = {
                    page: 1,
                    size: 999
                };
                listGroup(data).then(res => {
                    if (res.code == '000000') {
                        this.options1 = []
                        res.result.list.forEach(item => {
                            this.show = true
                            this.options1.push({
                                value: item.id,
                                label: item.name
                            });
                        });
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
                        this.checkedCities = []
                        this.cities = []
                        this.checkAll = false
                        this.pageTotal = res.result.total;
                        res.result.list.forEach(item => {
                            this.cities.push(item);
                        });
                    }
                })
            },
            //通过id查询
            searchUsers() {
                let data = {
                    id: this.searchData
                };
                searchUsers(data).then(res => {
                    if (res.code == '000000') {

                        this.cities = []
                        this.pageTotal = 1;
                        this.cities.push(res.result);
                    }
                })
            },
            //添加用户
            addUsers() {
                let data = {
                    nickname: this.createdData.nickname,
                    username: this.createdData.username,
                    password: this.createdData.password,
                    mobile: this.createdData.mobile,
                    email: this.createdData.email,
                };
                addUsers(data).then(res => {
                    this.addUserGroup(this.createdData.E, res.result.id)
                })
            },
            //添加组成员
            addUserGroup(x, y) {
                let data = {
                    group_id: x,
                    uids: y
                }
                addUserGroup(data).then(res => {
                    this.listUsers()
                })
            },
            //删除用户
            delUser(x) {
                let data = {
                    id: x,
                }
                delUser(data).then(res => {

                })
            },
            //添加用户
            AddFn(x) {
                if(this.$store.state.result[0].state == false){
                    this.$toast('该用户没有此权限！')
                    return false
                }
                if (x == 1) {

                    for (const key in this.createdData) {
                        if (this.createdData[key] == '') {
                            this.$toast("请填写正确信息！");
                            this.createdData = {
                                nickname: '',
                                username: '',
                                password: '',
                                E: '',
                                mobile: '',
                                email: ''
                            }
                            return false
                        }
                    }
                    this.addUsers()

                }
                //控制添加用户组件
                this.tableShow = !this.tableShow;

            },

            //删除用户
            allcancel() {
                this.deleted.forEach(item => {
                    this.delUser(item.id)
                })
            },
            //批量操作
            fnClick(x) {
                //清除select 下拉 value值
                this.value = ''
                //删除用户
                if (this.deleted.length == 0) {
                    this.$toast("未选中数据！");
                    return false
                }
                if (x == 1) {
                    if(this.$store.state.result[2].state == false){
                    this.$toast('该用户没有此权限！')
                    return false
                }
                    //设置用户
                    this.maskShow = true
                    this.confirmMaskShow = true

                } else {
                    
                    if (this.deleted.length > 1) {
                        this.$toast("只能选择一个！");
                        return false
                    }
                    //设置用户
                    this.maskShow = true
                    this.setMaskShow = true
                }


            },
            //删除用户
            cancelUser(x) {
                this.maskShow = false
                this.confirmMaskShow = false
                if(x==0){
                    this.allcancel()
                }
                setTimeout(() => {
                        this.listUsers()
                    }, 50)
                
            },
            //修改用户
            modifyClick(data) {
                if(this.$store.state.result[1].state == false){
                    this.$toast('该用户没有此权限！')
                    return false
                }
                this.maskShow = true
                this.modifyMaskShow = true
                this.modifyData = data

            },
            //设置组后关闭遮罩层
            cancelMask() {
                this.maskShow = false
                this.setMaskShow = false
                this.modifyMaskShow = false
                this.deleted = [];
                setTimeout(() => {
                    this.listUsers()
                }, 50)
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.checkAll = false;
                this.deleted = [];
                this.listUsers()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },

            //复选框全选
            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;
                //在全选的时候初始化选中结果为接口参数
                this.deleted = [];
                if (val == true) {
                    this.deleted = this.cities;
                }
            },
            //复选框选择
            handleCheckedCitiesChange(value) {
                //初始化选中结果
                this.deleted = [];
                //遍历选中结果
                value.forEach(element => {
                    this.deleted.push(element);
                });

                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate =
                    checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    };
</script>

<style scoped>
    .conversationBox {
        width: 100%;
        height: 873px;
    }

    .activebox {
        width: 1512px;
        height: 121px;
        margin: auto;
        border-bottom: 1px solid rgba(0, 219, 255, 0.5);
        box-sizing: border-box;
    }

    .activebox>div {
        width: 100%;
        padding-top: 88px;
        display: flex;
        margin: auto;
        box-sizing: border-box;
    }

    .activebox>div>div {
        width: 168px;
        height: 24px;
        text-align: center;
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: rgba(0, 219, 255, 0.5);
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
    }

    .activebox>div>div>span:nth-child(2) {
        display: inline-block;
        width: 38px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        color: rgba(255, 255, 255, 1) !important;
        border-radius: 20px;
        text-align: center;
    }

    .active {
        color: rgba(0, 217, 255, 1) !important;
    }

    .active>span:nth-child(1) {
        position: relative;
    }

    .active>span:nth-child(1)::before {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        width: 168px;
        height: 2px;
        background: rgba(0, 217, 255, 1);
        margin-left: -84px;
    }

    .conversationLeft {
        width: 1512px;
        height: 751px;
        margin: auto;
    }

    .conversationRight {
        float: left;
        width: 521px;
        height: 100%;
    }

    .conversationRight>div:nth-child(1) {
        display: flex;
        /* flex-direction: row; */
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 40px 73px 0;
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

    .table-created {
        margin-top: 10px;
        height: 32px;
        border: 1.4px dashed rgba(0, 217, 255, 0.4);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 8px;
        line-height: 32px;
        text-align: center;
        color: rgba(0, 217, 255, 0.6);
    }

    .table-head>span,
    .table-child>span {
        display: block;
    }

    .table-head>span:nth-child(1),
    .table-child>span:nth-child(1) {
        width: 64px;
        overflow: hidden;
        padding-left: 24px;
        box-sizing: border-box;
    }

    .table-head>span:nth-child(2),
    .table-child>span:nth-child(2),
    .table-head>span:nth-child(3),
    .table-child>span:nth-child(3) {
        width: 150px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4),
    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5),
    .table-head>span:nth-child(6),
    .table-child>span:nth-child(6),
    .table-head>span:nth-child(7),
    .table-child>span:nth-child(7) {
        width: 255px;
    }

    .table-head>span:nth-child(8),
    .table-child>span:nth-child(8) {
        width: 100px;
        cursor: pointer;
    }

    .table-child>span:nth-child(6),
    .table-child>span:nth-child(7) {
        padding-right: 10px;
        box-sizing: border-box;
    }

    .table-child>span:nth-child(6)>input,
    .table-child>span:nth-child(7)>input {
        width: 100%;
    }



    /* sousuo  */
    .search-list {
        width: 100%;
        height: 92px;
        display: -webkit-flex;
        justify-content: flex-start;
        padding-top: 40px;
        box-sizing: border-box;
    }

    .search-list>div:nth-child(1) {
        width: 366px;
    }

    .search-list>div:nth-child(2) {
        flex-grow: 1;
    }

    .search-list>div:nth-child(3) {
        width: 113px;
    }

    .search-list>div:nth-child(4) {
        width: 100px;
    }

    .search-list>div>span {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: rgba(0, 217, 255, 1);
    }

    .btn-bt {
        width: 83px;
        height: 32px;
        background: rgba(0, 217, 255, 0.6);
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
    }

    input {
        width: 256px;
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

    .created-child>span {
        padding-right: 24px !important;
        box-sizing: border-box
    }

    .state {
        position: relative;
        padding-left: 14px;
        box-sizing: border-box;
    }

    /*  */
    .conversationBox /deep/ .el-select,
    .conversationBox /deep/ .el-date-editor.el-input,
    input[class='test'] {
        width: 100%;
    }

    /*  */
</style>