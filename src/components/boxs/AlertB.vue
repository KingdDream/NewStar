<template>
    <div class="conversationLeft">
        <div class="search-list">

        </div>
        <div class="table-list">
            <div class="table-head">
                <span>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                    </el-checkbox>
                </span>
                <span>终端号</span>
                <span>行为</span>
                <span>等级</span>
                <span>状态</span>
                <span>告警时间</span>
                <span>操作</span>
            </div>
            <div class="table-child" v-for="(item,index) in cities" :key="index">
                <span>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item" :key="index"></el-checkbox>
                    </el-checkbox-group>
                </span>
                <span>{{item.content}}</span>
                <span>{{item.warningName}}</span>
                <span>{{item.warningLevelName}}</span>
                <span>{{item.isDone==1?"已处理":"未处理"}}</span>
                <span>{{item.warningTime}}</span>
                <span @click="cancel(item.id)" style="cursor: pointer;">确认</span>
            </div>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
        <masks v-if="maskShow"></masks>
        <confirmMask v-if="confirmMaskShow" @cancelUser="cancelUser" title="是否确认选中的数据吗？"></confirmMask>
    </div>
</template>

<script>
    import { selByTerm, isRead, isDone, selLogs } from "../../request/api"
    export default {
        data() {
            return {
                options: [
                    {
                        label: "全部",
                        value: "0"
                    },
                    {
                        label: "紧急",
                        value: "1"
                    },
                    {
                        label: "严重",
                        value: "2"
                    },
                    {
                        label: "一般",
                        value: "3"
                    },

                ],
                value: "",
                value1: "",
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
                // 接口
                dataLevel: '',
                dataDate: '',
                dataIsRead: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                maskShow: false,
                confirmMaskShow: false,
                ids: null
            };
        },
        created() {
            this.selByTerm()
        },
        components: {
            masks: () => import("@/components/mask/mask"),
            confirmMask: () => import("@/components/mask/confirm"),
        },
        //钩子函数在Vue 实例销毁后调用
        destroyed() {
            // this.$bus.off("AlertB")
        },
        methods: {
            selByTerm() {
                let data = {
                    date: this.dataDate,
                    level: this.dataLevel,
                    page: this.currentPage,
                    size: this.pageSize,
                }
                for (const key in data) {
                    if (data[key] == '') {
                        delete data[key]
                    }
                }
                selByTerm(data).then(res => {
                    if (res.result.list.length > 0) {
                        this.checkedCities = []
                        this.pageTotal = res.result.total;
                        this.cities = res.result.list
                        this.dataIsRead = []
                        res.result.list.forEach(item => {
                            this.dataIsRead.push(item.id)
                        })
                        this.isRead()
                    }
                })
            },
            isRead() {
                let data = { ids: this.dataIsRead.join(",") }
                isRead(data).then(res => {
                    if (res.result >= 0) {
                        this.$bus.emit("AlertB", res.result);
                    }
                })
            },
            isDone(id) {
                let data = {
                    ids: id
                }
                isDone(data).then(res => {

                })
            },
            selLogs() {
                selLogs().then(res => {
                    if (res.result.list.length > 0) {
                        res.result.list
                    }
                })
            },
            cancel(x) {
                this.maskShow = true
                this.confirmMaskShow = true
                if (x) {
                    this.ids = x
                }

            },
            //确认后返回
            cancelUser(x) {
                this.maskShow = false
                this.confirmMaskShow = false
                if (x == 0) {
                    this.allcancel()
                }

            },
            //批量确认
            allcancel() {
                //id等于undefined 批量删除
                let data = []
                this.deleted.forEach(item => {
                    data.push(item.id)
                })
                if (this.deleted.length > 0) {
                    this.isDone(data.join(","))
                } else {
                    this.isDone(this.ids)
                }
                setTimeout(() => {
                    this.selByTerm()
                }, 50)
            },



            handleCurrentChange(val) {
                this.currentPage = val;
                this.checkAll = false;
                this.deleted = [];
                this.selByTerm()
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
        width: 1384px;
        height: 121px;
        margin: auto;
        border-bottom: 1px solid rgba(0, 219, 255, 0.5);
        box-sizing: border-box;
    }

    .activebox>div {
        width: 1128px;
        padding-top: 88px;
        display: flex;
        margin: auto;
        box-sizing: border-box;
    }

    .activebox>div>div {
        padding: 0 40px;
        height: 24px;
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        color: rgba(0, 219, 255, 0.5);
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
    }

    .activebox>div>div::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: rgba(0, 219, 255, 0.4);
    }

    .activebox>div>div:last-child::after {
        display: none;
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
        width: 100px;
        height: 2px;
        background: rgba(0, 217, 255, 1);
        margin-left: -50px;
    }

    .conversationLeft {
        width: 1128px;
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

    .table-head>span,
    .table-child>span {
        display: block;
    }

    .table-head>span:nth-child(1),
    .table-child>span:nth-child(1) {
        width: 100px;
        overflow: hidden;
        padding-left: 24px;
        box-sizing: border-box;
    }

    .table-head>span:nth-child(2),
    .table-child>span:nth-child(2),
    .table-head>span:nth-child(3),
    .table-child>span:nth-child(3),

    .table-head>span:nth-child(6),
    .table-child>span:nth-child(6) {
        width: 200px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4),
    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5) {
        width: 150px;
    }

    .table-head>span:nth-child(7),
    .table-child>span:nth-child(7) {
        width: 100px;
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
        width: 83px;
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

    .state {
        position: relative;
        padding-left: 14px;
        box-sizing: border-box;
    }

    .state::after {
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 50%;
    }

    /*  */
    .conversationBox /deep/ .el-select,
    .conversationBox /deep/ .el-date-editor.el-input {
        width: 256px;
    }

    /*  */
</style>