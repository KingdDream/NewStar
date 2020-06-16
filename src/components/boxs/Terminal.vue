<template>
    <div class="conversationBox">
        <div class="conversationLeft">
            <div class="search-list">
                <input v-if="searchShow" type="search" placeholder="搜索" />
                <button v-if="cancelShow" class="btn-bt" @click="cancel()">批量删除</button>
            </div>
            <div class="table-list">
                <div class="table-head">
                    <span>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        </el-checkbox>
                    </span>
                    <span>终端序列</span>
                    <span>运行状态</span>
                    <span>入网过程</span>
                    <span>坐标</span>
                    <span>操作</span>
                </div>
                <div v-if="show" class="table-child" v-for="(item,index) in cities" :key="index">
                    <span>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </span>
                    <span>{{item.id}}</span>
                    <span><span class="state">{{item.status}}</span></span>
                    <span>{{item.create_time}}</span>
                    <span>经度：{{item.longitude}}，纬度：{{item.latitude}}</span>
                    <span @click="cancel(item.id)" style="cursor: pointer;">删除</span>
                </div>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
                :total="pageTotal">
            </el-pagination>
            <div class="downloadMask" @click="downloadMask" title="导出" style="cursor: pointer;"><i class="el-icon-download"></i></div>
        </div>
        <masks v-if="maskShow"></masks>
        <confirmMask v-if="confirmMaskShow" @cancelUser="cancelUser" title="确认删除选中的数据吗？"></confirmMask>
    </div>
</template>

<script>
    import {
        findAll,
        removeState,
        toExcelUe
    } from "../../request/api"
    export default {
        data() {
            return {
                value: "",
                list: 9,
                value1: "",
                checkAll: false,
                checkedCities: [],
                cities: [],
                deleted: [],
                isIndeterminate: true,
                currentPage: 1,
                pageSize: 9,
                show: true,
                pageTotal: 99,
                //搜索
                searchShow: true,
                //批量删除
                cancelShow: false,
                maskShow: false,
                confirmMaskShow: false,
                ids: null
            };
        },
        watch: {
            deleted: {
                handler(val) {
                    if (val.length > 0) {
                        this.cancelShow = true
                    } else {
                        this.cancelShow = false
                    }
                },
                deep: true //深度监听
            }
        },
        components: {
            masks: () => import("@/components/mask/mask"),
            confirmMask: () => import("@/components/mask/confirm"),
        },
        mounted() {
            this.findAll()
        },
        methods: {
            //终端----findAll
            findAll() {
                let data = {
                    page: this.currentPage,
                    size: this.pageSize
                }
                findAll(data).then(res => {
                    this.checkedCities = []
                    this.deleted = []
                    this.cities = [];
                    if (res.result.list.length > 0) {
                        this.pageTotal = res.result.total;
                        res.result.list.forEach(item => {
                            this.cities.push(item);
                        });
                        this.show = true
                    }

                }).catch(res => {
                    this.$toast("数据异常请联系客服人员！");
                })
            },
            //删除数据接口
            removeState(ids) {
                let data = { ids: ids }
                removeState(data).then(res => {
                    if (res.result == '删除成功') {
                        this.$toast("数据删除成功！");
                        this.findAll()
                        this.deleted = []
                        this.checkAll = false
                    }
                }).catch(res => {
                    this.$toast("数据异常请联系客服人员！");
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
            //删除
            allcancel() {
                let data = []
                this.deleted.forEach(item => {
                    data.push(item.id)
                })
                if (this.deleted.length > 0) {
                    this.removeState(data.join(","))

                } else {
                    this.removeState(this.ids)
                }


            },
            downloadMask(){
                this.$windowOpen('ue')
            },
            //分页跳转
            handleCurrentChange(val) {
                this.currentPage = val
                this.findAll()
                // console.log(`当前页: ${val}`);
            },
            //无用
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },

            handleCheckAllChange(val) {
                this.checkedCities = val ? this.cities : [];
                this.isIndeterminate = false;

                //在全选的时候初始化选中结果为接口参数
                this.deleted = [];
                if (val == true) {
                    this.deleted = this.cities;
                }
            },
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
        width: 1128px;
        height: 873px;
        margin: auto;
    }

    .conversationLeft {
        width: 100%;
        height: 100%;
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
        padding: 92px 73px 0;
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
        width: 128px;
        overflow: hidden;
        padding-left: 24px;
        box-sizing: border-box;
    }

    .table-head>span:nth-child(2),
    .table-child>span:nth-child(2) {
        width: 128px;
    }

    .table-head>span:nth-child(3),
    .table-child>span:nth-child(3) {
        width: 192px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4) {
        width: 320px;
    }

    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5) {
        width: 320px;
    }

    .table-head>span:nth-child(6),
    .table-child>span:nth-child(6) {
        width: 104px;
    }

    /* sousuo  */
    .search-list {
        width: 100%;
        height: 162px;
        display: -webkit-flex;
        justify-content: space-between;
        padding-top: 110px;
        box-sizing: border-box;
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
        box-sizing: border-box;
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
        box-sizing: border-box
    }

    .state::after {
        content: '';
        position: absolute;
        left: 0;
        top: 7px;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 50%
    }
</style>