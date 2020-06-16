<template>
    <div class="conversationBox">
        <div class="conversationLeft">
            <div class="search-list">
                <span>设备数量</span>
                <span>{{25}}</span>
                <button class="btn-bt" v-if="cancelShow" @click="cancel()">批量删除</button>
            </div>
            <div class="table-list">
                <div class="table-head">
                    <span>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                        </el-checkbox>
                    </span>
                    <span>设备名称</span>
                    <span>运行状态</span>
                    <span>运行时间</span>
                    <span>操作</span>
                </div>
                <div class="table-child" v-for="(item,index) in cities" :key="index">
                    <span>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item" :key="index"></el-checkbox>
                        </el-checkbox-group>
                    </span>
                    <span @click="equipmentswitch(item.id,item.day,item.hour,item.minute)">TradeCode {{item.id}}</span>
                    <span>
                        <span class="state">运行中</span>
                    </span>
                    <span>{{item.run_time}} 秒</span>
                    <span @click="cancel(item.id)" style="cursor: pointer;">删除</span>
                </div>
            </div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
                :total="pageTotal">
            </el-pagination>
            <div class="downloadMask" @click="downloadMask" title="导出" style="cursor: pointer;"><i class="el-icon-download"></i></div>
        </div>
        <div class="conversationRight">
            <div>
                <LineSystem :echartData="temperature" :echartTime="systemtime" myEcharts="A" :myEcharts1="echarId"
                    titleName="温度状况" />
            </div>
            <div>
                <LineSystem :echartData="systemLoad" :echartTime="systemtime" :myEcharts1="echarId" myEcharts="B"
                    titleName="系统负载" />
            </div>
            <div>
                运行时间
                <span class="NumD">{{timeEnd[0]}}</span>
                <span class="NumS">d</span>
                <span class="NumD">{{timeEnd[1]}}</span>
                <span class="NumS">h</span>
                <span class="NumD">{{timeEnd[2]}}</span>
                <span class="NumS">m</span>
            </div>
        </div>
        
        <masks v-if="maskShow"></masks>
        <confirmMask v-if="confirmMaskShow" @cancelUser="cancelUser" title="确认删除选中的数据吗？"></confirmMask>
    </div>
</template>

<script>
    import {
        findRun,
        findDetails,
        removeStateSystem,
        toExcelSystem
    } from "../../request/api";
    export default {
        data() {
            return {
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
                //系统数据
                temperature: [],
                systemLoad: [],
                systemtime: [],
                //
                echarId: 0,
                timeEnd: [0, 0, 0],
                maskShow: false,
                confirmMaskShow: false,
                ids: null
            };
        },
        components: {
            LineSystem: () => import("@/components/child/LineSystem"),
            masks: () => import("@/components/mask/mask"),
            confirmMask: () => import("@/components/mask/confirm"),
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
        mounted() {
            this.findRun();
        },
        methods: {
            //设备列表
            findRun() {
                let data = {
                    page: this.currentPage,
                    size: this.pageSize
                };
                //遍历数组
                findRun(data)
                    .then(res => {
                        this.checkedCities = []
                        this.deleted = []
                        this.cities = []
                        this.pageTotal = res.result.total;
                        res.result.list.forEach(item => {
                            this.cities.push(item);
                        });
                        this.timeEnd = [this.cities[0].day, this.cities[0].hour, this.cities[0].minute]
                        this.findDetails(this.cities[0].id);
                    })
                    .catch(res => {
                        this.$toast("数据异常请联系客服人员！");
                    });
            },
            findDetails(id) {

                let data = {
                    id: id,
                    page: this.currentPage,
                    size: this.pageSize
                };
                findDetails(data)
                    .then(res => {
                        this.echarId = id;
                        this.temperature = []
                        this.systemLoad = []
                        this.systemtime = []
                        if (res.result.length > 0) {
                            res.result.forEach(item => {
                                this.temperature.push(item.avg_cpu_usage)
                                this.systemLoad.push(item.using_mem_kb)
                                this.systemtime.push(item.createTime)
                            })
                        } else {
                            console.log("接口无数据")
                        }

                    })
                    .catch(res => {
                        this.$toast("数据异常请联系客服人员！");
                    });
            },
            //删除数据接口
            removeState(ids) {
                let data = { ids: ids }
                removeStateSystem(data).then(res => {
                    if (res.result == '删除成功') {
                        this.$toast("数据删除成功！");
                        this.findRun()
                        this.deleted = []
                        this.checkAll = false
                    }
                }).catch(res => {
                    this.$toast("数据异常请联系客服人员！");
                })
            },
            //设备切换
            equipmentswitch(id, d, h, m) {
                this.timeEnd = [d, h, m]
                this.findDetails(id);
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
            //批量删除
            allcancel() {
                //id等于undefined 批量删除
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
                this.$windowOpen('system')
            },
            //分页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.findRun();
                this.checkAll = false;
                this.deleted = [];
                // console.log(`当前页: ${val}`);
            },
            //无用
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
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
        display: flex;
        width: 100%;
        height: 873px;
        margin: auto;
        padding: 0 72px;
        box-sizing: border-box;
        justify-content: center;
    }

    .conversationLeft {
        width: 744px;
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
        width: 744px;
        height: 100%;
        padding-top: 179px;
        box-sizing: border-box;
    }

    .conversationRight>div {
        width: 100%;
        /* height: 289px; */
        padding-left: 146px;
        box-sizing: border-box;
    }

    .conversationRight>div:nth-child(3) {
        font-size: 22px;
        text-align: right;
        color: rgba(0, 217, 255, 1);
        text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
    }

    .conversationRight .NumD {
        padding-left: 10px;
        font-size: 52px;
        font-family: "PangMenZhengDaoBiao";
        font-weight: 400;
        line-height: 32px;
        color: rgba(0, 217, 255, 1);
        box-sizing: border-box;
    }

    .conversationRight .NumD:nth-child(1) {
        padding-left: 30px;
        box-sizing: border-box;
    }

    .conversationRight .NumS {
        font-size: 28px;
        font-weight: 400;
        line-height: 32px;
        color: rgba(0, 217, 255, 1);
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
        width: 64px;
        overflow: hidden;
        padding-left: 24px;
        box-sizing: border-box;
    }

    .table-head>span:nth-child(2),
    .table-child>span:nth-child(2) {
        width: 194px;
    }

    .table-head>span:nth-child(3),
    .table-child>span:nth-child(3) {
        width: 190px;
    }

    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4) {
        width: 192px;
    }

    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5) {
        width: 104px;
    }

    /* sousuo  */
    .search-list {
        width: 100%;
        height: 179px;
        display: -webkit-flex;
        justify-content: flex-start;
        padding-top: 127px;
        box-sizing: border-box;
    }

    .search-list>span:nth-child(1) {
        font-size: 22px;
        font-weight: 400;
        line-height: 26px;
        color: rgba(0, 217, 255, 1);
        padding-right: 24px;
        box-sizing: border-box;
        text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
    }

    .search-list>span:nth-child(2) {
        flex-grow: 1;
        font-size: 52px;
        font-family: "PangMenZhengDaoBiao";
        font-weight: 400;
        margin-top: -19px;
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
</style>