<template>
    <div class="conversationBox">
        <div class="activebox">
            <div>
                <div v-for="(item,index) in title" :key="index" :class="active==index?'active':''"
                    @click="ActiveTab(index)">
                    <span>{{item.a}}</span>
                    <span v-if="index==2?false:true"
                        :style="{'background':item.b}">{{index==0?NoreadA:NoreadB}}</span>
                </div>

            </div>
        </div>
        <div class="conversationLeft">
            <AlertA v-if="active==0?true:false"/>
            <AlertB v-if="active==1?true:false"/>
            <AlertC v-if="active==2?true:false"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: [{ a: '终端告警', b: '#FFAA00' }, { a: '软件告警', b: '#FFAA00' }, { a: '操作日志', b: '#FFAA00' }],
                // tab
                active: 0,
                NoreadA: 9,
                NoreadB: 7,
            };
        },
        components: {
            AlertA: () => import("@/components/boxs/AlertA"),
            AlertB: () => import("@/components/boxs/AlertB"),
            AlertC: () => import("@/components/boxs/AlertC")
        },
        //钩子函数在Vue 实例销毁后调用
        destroyed() {
            this.$bus.off("AlertA")
            this.$bus.off("AlertB")
        },
        mounted() {
            this.$bus.on("AlertA", (val) => {
                this.NoreadA = val
            });
            this.$bus.on("AlertB", (val) => {
                this.NoreadB = val
            });
            
        },
        methods: {
            ActiveTab(i) {
                this.active = i
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
        width: 1128px;
        height: 121px;
        margin: auto;
        border-bottom: 1px solid rgba(0, 219, 255, 0.5);
        padding-left: 58px;
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
        padding: 0 82px;
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
</style>