<template>
    <div class="conversationLeft">
        <div class="search-list"></div>
        <div class="table-list">
            <div class="table-head">
                <span>序号</span>
                <span>用户名称</span>
                <span>操作行为</span>
                <span>IP地址</span>
                <span>操作时间</span>
            </div>
            <div class="table-child" v-for="(item,index) in cities" :key="index">
                <span>{{item.id}}</span>
                <span>{{item.operatorName}}</span>
                <span>{{item.content}}</span>
                <span>{{item.operatorIp}}</span>
                <span>{{item.operatorTime}}</span>
            </div>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
        <div class="downloadMask" @click="downloadMask" title="导出" style="cursor: pointer;"><i class="el-icon-download"></i></div>
    </div>
</template>

<script>
    import {selLogs,toExcelDaily } from "../../request/api"
    export default {
        data() {
            return {
                
                //分页
                currentPage: 1,
                pageSize: 9,
                pageTotal: 100,
                cities:[]
            
            };
        },
        created() {
            this.selLogs()
        },
        //钩子函数在Vue 实例销毁后调用
        methods: {
            selLogs() {
                let data = {
                    page: this.currentPage,
                    size: this.pageSize,
                }
                selLogs(data).then(res => {
                    if (res.result.list.length > 0) {
                        this.cities = res.result.list
                       this.pageTotal = res.result.total
                    }
                })
            },
            downloadMask(){
                this.$windowOpen('dailyLog')
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.selLogs()
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            
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
        position: relative;
    }
    .downloadMask {
        position: absolute;
        bottom: 82px;
        right: 0%;
        font-size: 30px;
        color: rgba(0, 217, 255, 0.8);
        border-radius: 5px;
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
        width: 150px;
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
        width: 150px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4),
    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5) {
        width: 330px;
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