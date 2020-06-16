<template>

    <div class="conversationLeft">
        <div class="search-list">
            <div>
            </div>
            <div></div>
            <div></div>
            <div v-if="cancelShow" @click="allcancel(3)" class="btn-bt">
                批量删除
            </div>
        </div>
        <div class="table-list">
            <div class="table-head">
                <span>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                    </el-checkbox>
                </span>
                <span>编号</span>
                <span>部门</span>
                <span>人数</span>
                <span>创建时间</span>
                <span>操作</span>
            </div>
            <div class="table-child" v-for="(item,index) in cities" :key="index">
                <span>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox :label="item" :key="index"></el-checkbox>
                    </el-checkbox-group>
                </span>
                <span>{{item.id}}</span>
                <span>{{item.name}}</span>
                <span>{{item.userNum}}</span>
                <span>{{item.createTime}}</span>
                <span>
                    <span @click=setOrganization(item)>修改</span>
                </span>
            </div>
            <div class="table-child created-child" v-if="tableShow">
                <span></span>
                <span></span>
                <span>
                    <input value="" v-model="addName" class="test" placeholder="名称" />
                </span>
                <span>
                    <input value="" v-model="description" class="test" placeholder="描述" />
                </span>
                <span></span>
                <span>
                    <span @click="AddFn(1)">添加</span>
                    <span @click="AddFn(2)">取消</span>
                </span>
            </div>
            <div class="table-created" v-if="!tableShow">
                <span @click="AddFn(0)" style="cursor:pointer">+ 添加</span>
            </div>
        </div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper"
            :total="pageTotal">
        </el-pagination>
        <masks v-if="maskShow"></masks>
        <setMask v-if="setmaskShow" @cancelMask="cancelMask" :Organization="Organization"></setMask>
        <confirmMask v-if="confirmMaskShow" @cancelUser="allcancel" title="确认删除选中的用户吗？"></confirmMask>

    </div>
</template>

<script>
    import { listGroup, addGroup, modifyGroup, removeGroup } from "../../request/api"
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
                tableShow: false,
                //
                description: null,
                addName: null,
                //遮罩层
                maskShow: false,
                setmaskShow: false,
                confirmMaskShow: false,
                Organization: {},
                alsdkaldka: []

            };
        },
        components: {
            masks: () => import("@/components/mask/mask"),
            setMask: () => import("@/components/mask/setOrganization"),
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
            this.listGroup()
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
                        this.deleted = []
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
            //添加组别
            addGroup() {
                let data = {
                    description: this.description,
                    name: this.addName,
                    parent_id: 1,
                }
                addGroup(data).then(res => {
                    if (res.code == '000000') {
                        this.listGroup()
                    }
                })
            },
            //删除组别
            removeGroup(id) {
                let data = {
                    id: id
                }
                removeGroup(data).then(res => {

                })

            },
            //添加组别
            AddFn(x) {

                this.tableShow = !this.tableShow;
                if (x == 1) {
                    this.addGroup()
                }
                this.description = null
                this.addName = null
            },
            //删除组别
            allcancel(x) {
                if (x == 0) {
                    if (this.deleted.length > 0) {
                        this.deleted.forEach(item => {
                            this.removeGroup(item.id)
                        })

                        this.maskShow = false
                        this.confirmMaskShow = false
                        setTimeout(() => {
                            this.listGroup()
                        }, 50)
                    } else {
                        this.$toast("请选择要删除的数据！");
                    }
                } else if (x == 1) {
                    this.maskShow = false
                    this.confirmMaskShow = false
                    setTimeout(() => {
                        this.listGroup()
                    }, 50)
                } else {
                    this.maskShow = true
                    this.confirmMaskShow = true
                }


            },
            //设置组别
            setOrganization(item) {
                this.Organization = item
                this.maskShow = true
                this.setmaskShow = true
            },
            //设置组后关闭遮罩层
            cancelMask() {
                this.maskShow = false
                this.setmaskShow = false
                this.listGroup()
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.checkAll = false;
                this.deleted = [];
                this.listGroup()
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
            handleCheckedCitiesChange(value, x, y) {
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
    .conversationLeft {
        width: 744px;
        height: 751px;
        margin: auto;
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
    .table-child>span:nth-child(3),
    .table-head>span:nth-child(4),
    .table-child>span:nth-child(4) {
        width: 128px;
    }

    .table-head>span:nth-child(5),
    .table-child>span:nth-child(5) {
        width: 192px;
    }

    .table-head>span:nth-child(6),
    .table-child>span:nth-child(6) {
        width: 104px;
    }

    .table-child>span:nth-child(6)>span:nth-child(1) {
        padding-right: 8px;
        cursor: pointer;
        box-sizing: border-box;
    }

    .table-child>span:nth-child(6)>span:nth-child(2) {
        padding-left: 8px;
        cursor: pointer;
        box-sizing: border-box;
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
        text-align: center;
        line-height: 32px;
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