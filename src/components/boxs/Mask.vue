<template>
    <div class="MaskBox">
        <div class="title">
            {{name}}
            <span class="el-icon-close" @click="fn"></span>
        </div>
        <!-- 组件 -->
        <!-- 通话统计 -->
        <Conversation v-if="ConversationShow" />
        <!-- 终端 -->
        <Terminal v-if="TerminalShow" />
        <!-- 载波 -->
        <Carrier v-if="CarrierShow" />
        <!-- 承载情况 -->
        <Loadbearing v-if="LoadbearingShow" />
        <!-- 告警信息 -->
        <Alert v-if="AlertShow" />
        <!-- IP吞吐量 -->
        <Ipthroughput v-if="IpthroughputShow" />
        <!-- 系统运行状况 -->
        <System v-if="SystemShow" />
        <!-- 用户管理 -->
        <Userset v-if="UserShow" />
        <!-- 部门管理 -->
        <Department v-if="departmentShow" />
        <!-- 权限管理 -->
        <Jurisdiction v-if="JurisdictionShow" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ConversationShow: false,
                TerminalShow: false,
                CarrierShow: false,
                LoadbearingShow: false,
                AlertShow: false,
                IpthroughputShow: false,
                SystemShow: false,
                UserShow: false,
                departmentShow: false,
                JurisdictionShow: false,
            };
        },
        props: ["name"],
        components: {
            Conversation: () => import("@/components/boxs/Conversation"),
            Terminal: () => import("@/components/boxs/Terminal"),
            Carrier: () => import("@/components/boxs/Carrier"),
            Loadbearing: () => import("@/components/boxs/Loadbearing"),
            Alert: () => import("@/components/boxs/Alert"),
            Ipthroughput: () => import("@/components/boxs/Ipthroughput"),
            System: () => import("@/components/boxs/System"),
            Userset: () => import("@/components/Setup/User"),
            Department: () => import("@/components/Setup/Department"),
            Jurisdiction: () => import("@/components/Setup/Department"),

        },
        mounted() {
            if (this.name == "通话量统计") {
                this.ConversationShow = true;
            }
            else if (this.name == "终端监控") {
                this.TerminalShow = true;
            }
            else if (this.name == "时隙监控") {
                this.CarrierShow = true;
            }
            else if (this.name == "承载情况") {
                this.LoadbearingShow = true;
            }
            else if (this.name == "告警信息") {
                this.AlertShow = true;
            }
            else if (this.name == "IP吞吐量") {
                this.IpthroughputShow = true;
            }
            else if (this.name == "系统运行状况") {
                this.SystemShow = true;
            }
            else if (this.name == "用户管理") {
                this.UserShow = true;
            }
            else if (this.name == "部门管理") {
                this.departmentShow = true;
            }
            else if (this.name == "权限管理") {
                this.JurisdictionShow = true;
            }
        },
        methods: {
            fn() {
                this.$bus.emit("MaskOver");
            }
        }
    };
</script>

<style scoped>
    .MaskBox {
        position: absolute;
        top: 104px;
        left: 132px;
        width: 1657px;
        height: 873px;
        background: url("../../assets/img/503DP12.png");
        background-size: cover;
    }

    .title {
        position: absolute;
        top: 8.5px;
        left: 0;
        width: 100%;
        height: 40px;
        line-height: 38px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        padding-left: 32px;
        color: rgba(0, 217, 255, 1);
        text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
        box-sizing: border-box;
    }

    .el-icon-close {
        position: absolute;
        top: 8px;
        right: 27px;
        cursor: pointer;
    }

    /* 修改分页 */
    .conversationBox /deep/ .el-pagination button:disabled,
    .conversationBox /deep/ .el-pagination .btn-next,
    .conversationBox /deep/ .el-pagination .btn-prev,
    .conversationBox /deep/ .el-dialog,
    .conversationBox /deep/ .el-pager li {
        /* width: 32px; */
        height: 32px;
        background: rgba(0, 217, 255, 0.2);
        border: 1px solid rgba(0, 217, 255, 0.4);
        border-radius: 4px;
        text-align: center;
        font-weight: 100;
        color: rgba(0, 217, 255, 1);
        margin: 0 4px;
    }
    .conversationBox /deep/ .el-pagination__editor.el-input{
        width:auto;
    }
    .conversationBox /deep/ .el-pagination .btn-prev,
    .conversationBox /deep/ .el-pagination .btn-next {
        padding: 0;
    }

    .conversationBox /deep/ .el-pager li.btn-quicknext,
    .conversationBox /deep/ .el-pager li.btn-quickprev {
        background: rgba(0, 217, 255, 0);
        border: 0;
    }

    .conversationBox /deep/ .el-pagination .btn-next .el-icon,
    .conversationBox /deep/ .el-pagination .btn-prev .el-icon {
        font-size: 16px;
    }

    .conversationBox /deep/ .el-pager li.active {
        color: #fff !important;
        background: rgba(0, 217, 255, 0.8);
    }

    .conversationBox /deep/ .el-pagination button,
    .conversationBox /deep/ .el-pagination span:not([class*="suffix"]) {
        font-size: 16px;
        color: rgba(0, 217, 255, 1);
    }

    .conversationBox /deep/ .el-pagination__editor.el-input .el-input__inner {
        height: 32px;
        background: rgba(0, 217, 255, 0.6);
        border: 1px solid rgba(0, 217, 255, 0.4);
        border-radius: 4px;
        color: rgba(0, 217, 255, 1);
    }

    .conversationBox /deep/ .el-pagination {
        text-align: center;
    }

    /*  */
    .conversationBox /deep/ .el-input__inner {
        background: rgba(0, 217, 255, 0.4);
        border: 0;
        height: 32px;
        position: relative;
        color: rgba(255, 255, 255, 0.8);
    }

    .conversationBox /deep/ .el-input__icon {
        line-height: 32px;
    }

    .conversationBox /deep/ .el-checkbox__inner {
        width: 16px;
        height: 16px;
        background: transparent;
        border: 1px solid rgba(0, 217, 255, 0.4);
    }

    .conversationBox /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
        background: rgba(0, 217, 255, 1);
    }

    .conversationBox /deep/ .el-checkbox__input.is-checked+.el-checkbox__label,
    .conversationBox /deep/ .el-checkbox {
        color: transparent;
    }

    .conversationBox /deep/ .el-table th,
    .conversationBox /deep/ .el-table tr {
        background: transparent;
    }

    .conversationBox /deep/ .el-table td,
    .conversationBox /deep/ .el-table th.is-leaf {
        height: 53px;
        color: rgba(0, 217, 255, 0.6);
        border-bottom: 1px solid rgba(0, 217, 255, 0.4);
    }
</style>