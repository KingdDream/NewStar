<template>
    <div class="conversationBox">
        <div class="div" v-if="show">
            <div class="name">
                <div v-for="item in 8">第{{item}}帧</div>
            </div>
            <div v-for="(itemX,indexX) in myEcharts" class="boxY">
                <div v-if="(itemY.createTime=='99999999999')?false:true"
                    :style="{width:((itemY.length/num)*100+'%'),background:('linear-gradient(-90deg, rgba('+itemY.color+',0.2), rgba('+itemY.color+',0.8))')}"
                    v-for="(itemY,indexY) in itemX" class="boxX">
                    <div v-if="itemY.yid==8?true:false" class="Burst"> 突发{{indexY+1}}</div>
                    {{itemY.type}}{{itemY.ue_id}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        findUeTimeslot,
    } from "../../request/api"
    export default {
        data() {
            return {
                show: false,
                myEcharts: [[[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []], [[], [], [], [], []],],
                echart: [],
                num: 0,
                list: [],
            };
        },
        mounted() {
            this.findUeTimeslot()
        },
        methods: {
            // 时隙监控----beamTimeslot
            findUeTimeslot() {
                findUeTimeslot().then(res => {
                    if (res.result.length > 0) {
                        res.result.forEach(item => {
                            item.color1 = item.color
                            if (item.type == 'NULL8' || item.type == 'NULL') {
                                item.ue_id = ''
                            } else {
                                item.ue_id = " : " + item.ue_id
                            }
                            this.myEcharts[item.yid - 1][item.xid - 1] = item
                        });
                        this.myEcharts.forEach((item, index) => {

                            item.forEach((x, y) => {

                                if (!x.length) {
                                    item[y] = {
                                        beam_id: 124886,
                                        carrier_id: 124886,
                                        color: "#4D4DFF",
                                        count: 77219,
                                        createTime: "99999999999",
                                        id: 2630449,
                                        length: 0,
                                        type: "NULL8",
                                        ue_id: 14843,
                                        xid: y,
                                        yid: index
                                    }
                                }
                            })
                        })

                        this.myEcharts[0].forEach(item => {
                            this.num += item.length
                        })
                        this.show = true
                    }

                }).catch(res => {
                    this.$toast("数据异常请联系客服人员！");
                })
            }, rgb() {//rgb颜色随机
                var r = Math.floor(Math.random() * 256);
                var g = Math.floor(Math.random() * 256);
                var b = Math.floor(Math.random() * 256);
                var rgb = '(' + r + ',' + g + ',' + b + ')';
                return rgb;
            }


        }
    };
</script>

<style scoped>
    .conversationBox {
        width: 1128px;
        height: 873px;
        margin: auto;
        padding: 120px 100px 0;
        box-sizing: border-box;
    }

    .div {
        width: 100%;
        height: 640px;
        box-sizing: border-box;
        position: relative;

    }

    .div::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 3px;
        height: 105%;
        background: #07F7FF;
    }

    .div::before {
        position: absolute;
        content: '';
        left: 0;
        bottom: 0;
        width: 110%;
        height: 3px;
        background: #07F7FF;
    }

    .boxY {
        min-width: 10%;
        height: 40px;
        position: relative;
        margin-bottom: 40px;
        /* overflow: hidden; */
    }

    .name {
        position: absolute;
        top: 0;
        right: 100%;
        width: 80px;
        height: 100%;
    }

    .name>div {
        min-width: 10%;
        height: 40px;
        position: relative;
        margin-bottom: 40px;
        line-height: 40px;
        text-align: center;
        color: rgba(0, 217, 255, 1);;
    }
    .name>div::before{
        position: absolute;
        content: '';
        top: 0px;
        right: -3px;
        width: 6px;
        height:100%;
        background: #07F7FF;
    }

    .boxX {
        display: inline-block;
        height: 100%;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        position: relative;
        /* animation: move 3s 1s linear infinite alternate; */
        /* border-radius: 10px; */
    }
    .Burst{
        position: absolute;
        left: 0;
        top: 80px;
        width: 100%;
        height: 100%;
        color: rgba(0, 217, 255, 1);
    }
    .Burst::before{
        position: absolute;
        content: '';
        top: -4px;
        right:-15px;
        width:30px;
        height: 6px;
        background: #07F7FF;
    }
    .boxY::after {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        width: 100%;
        height: 100%;
        background: radial-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3));
        /* animation: move 5s 1ms linear infinite; */
    }

    @keyframes move {
        0% {
            left: 0;
        }

        100% {
            left: 100%;
        }
    }
</style>