<template>
    <div class="box" id="boxImg">
        <!-- 头部 -->
        <HearTop @SetUp="SetUp" />
        <!-- 底部 -->
        <TimeEnd />
        <!-- 用户设置 -->
        <!-- 地球 -->
        <div class="Earthaperture">
            <div class="aperture1" v-if="show"></div>
            <div class="aperture2" v-if="show"></div>
            <div class="Eart">
                <MapQ v-show="MapEart" />
                <!-- <MapD v-if="MapWorld" /> -->
            </div>
        </div>
        <!-- 左侧 -->
        <div class="NumChild" v-show="show">
            <span class="title" @click="fn('通话量统计')">通话量统计</span>
            <NumberChild color="0" :endVal="call.a" duration="3000" WrittenWords="当前" />
            <NumberChild color="1" :endVal="call.b" duration="5000" WrittenWords="总计" />
        </div>
        <div class="NumChild twoChild Carrierterminal" v-show="show">
            <div>
                <span class="title" @click="fn('时隙监控')">时隙监控</span>
                <PieChild type="0" echartsName="One" />
            </div>
            <div>
                <span class="title" @click="fn('终端监控')">终端监控</span>
                <PieChild type="1" echartsName="One1" />
            </div>
        </div>
        <div class="NumChild Loadingcondition" v-show="show">
            <span class="title" @click="fn('承载情况')">承载情况</span>
            <LineChild :echartData="bearing" type="0" echartsName="Two" />
        </div>
        <!-- 右侧 -->
        <div class="NumChild Alarminformation" v-show="show">
            <span class="title" @click="fn('告警信息')">告警信息</span>
            <Alarminformation :echartData="warning" />
        </div>
        <div class="NumChild throughput" v-show="show">
            <span class="title" @click="fn('IP吞吐量')">IP吞吐量</span>
            <LineChild echartData="200" type="1" echartsName="Three" />
        </div>
        <div class="NumChild system" v-show="show">
            <span class="title" @click="fn('系统运行状况')">系统运行状况</span>
            <LineChild echartData="200" type="2" echartsName="Four" />
        </div>
        <!-- 遮罩层 -->
        <Maskbox v-if="!MaskShow" :name="titleName" />
    </div>
</template>

<script>
    import { findPermissionsByUID } from '../request/api'; //先要引入
    export default {
        data() {
            return {
                // ip: "ws://192.168.43.201:8080/",
                ip:"ws://192.168.1.104:8080/cms/",
                show: true,
                MapEart: true,
                MapWorld: false,

                MaskShow: true,
                titleName: null,
                call: {
                    a: null,
                    b: null
                },
                bearing: null,
                warning: null,
            };
        },
        mounted() {

            if (this.$route.query.id) {
                //通话时长----call
                this.dddd = this.wsData("call", this.$route.query.id);
                //载波----beamTimeslot
                //终端----ueTimeslot
                this.wsData("beamTimeslot", this.$route.query.id);
                this.wsData("ueTimeslot", this.$route.query.id);
                //承载情况----bearing
                this.wsData("bearing", this.$route.query.id);
                //告警监控----warning
                this.wsData("warning", this.$route.query.id);
                //吞吐量----ip
                this.wsData("ip", this.$route.query.id);
                //系统运行----system
                this.wsData("system", this.$route.query.id);
                // console.log(this.$route.query.id)
                this.wsData("ue", this.$route.query.id);
            }
            //bus
            // this.$bus.on("hide", () => {
            //     this.show = false;
            //     this.MapWorld = true;
            //     setTimeout(x => {
            //         this.MapEart = false;
            //     }, 2100);
            // });
            this.$bus.on("MaskOver", () => {
                document.getElementById("boxImg").setAttribute("class", "box");
                this.show = !this.show;
                this.MapEart = !this.MapEart;
                this.MaskShow = !this.MaskShow;
                this.$store.commit('stateTitle_show', true);
            });
            this.setId()

        },
        components: {
            NumberChild: () => import("@/components/child/Number"),
            LineChild: () => import("@/components/child/Line"),
            PieChild: () => import("@/components/child/Pie"),
            Alarminformation: () => import("@/components/child/Alarminformation"),
            TimeEnd: () => import("@/components/child/TimeEnd"),
            HearTop: () => import("@/components/child/HearTop"),
            MapD: () => import("@/components/child/Map"),
            MapQ: () => import("@/components/child/MapQ"),
            Maskbox: () => import("@/components/boxs/Mask"),
            User: () => import("@/components/Setup/User")
        },
        methods: {
            setId() {
                this.$store.commit('stateId', this.$route.query.id)
                this.vuexSetJurisdiction(this.$route.query.id)
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
            SetUp(val) {

                switch (val) {
                    case '用户管理':
                        document
                            .getElementById("boxImg")
                            .setAttribute("class", "box boxImg");
                        this.$store.commit('stateTitle_show', !this.$store.state.title_show);
                        this.titleName = val;
                        this.MapEart = !this.MapEart;
                        this.show = !this.show;
                        this.MaskShow = !this.MaskShow;

                        break;
                    case '切换模式':
                    this.$store.commit('stateTitle_show1', !this.$store.state.title_show1);
                        this.MapWorld = !this.MapWorld
                        this.MapEart = !this.MapEart;
                        this.show = !this.show;
                        break;
                    // case 2:
                    //     this.$emit("SetUp", "切换模式");stateTitle_show
                    //     break;
                    default:
                        return
                }

            },
            //跳转子页面
            fn(a) {
                document
                    .getElementById("boxImg")
                    .setAttribute("class", "box boxImg");
                this.titleName = a;
                this.show = !this.show;
                this.MapEart = !this.MapEart;
                this.MaskShow = !this.MaskShow;
                this.$store.commit('stateTitle_show', !this.$store.state.title_show);
            },
            // 推送数据
            wsData(x, y) {
                let that = this;
                this.socket = new WebSocket(that.ip + x + "/" + y);
                this.socket.onmessage = function (e) {
                    if (e.data == "成功连接！" || e.data == "Success！") {
                        return false;
                    }
                    let data = JSON.parse(e.data);
                    if (x == "call") {
                        that.call.a = data.result.calling_num;
                        that.call.b = data.result.calling_total;
                    }
                    if (x == "beamTimeslot") {
                        // console.log(data);
                        that.$bus.emit("beamTimeslot", data.result);
                    }
                    if (x == "ueTimeslot") {
                        // console.log(data);
                        that.$bus.emit("ueTimeslot", data.result);
                    }
                    if (x == "ue") {
                        // console.log(data);
                        that.$bus.emit("ue", data.result);
                    }
                    if (x == "bearing") {
                        data.result.create_time = that.GetTimeHM(
                            data.result.create_time
                        );
                        // console.log(data)
                        that.$bus.emit("bearings", data.result);
                    }
                    if (x == "warning") {
                        data.result.forEach(item => {
                            let my = new Date(item.warningTime);
                            let N = my.getFullYear();
                            let Y = that.ZeroN(my.getMonth() + 1);
                            let R = that.ZeroN(my.getDate());
                            item.day = N + "-" + Y + "-" + R;
                            let H = that.ZeroN(my.getHours());
                            let F = that.ZeroN(my.getMinutes());
                            let M = that.ZeroN(my.getSeconds());
                            item.hour = H + ":" + F + ":" + M;
                        });
                        that.warning = data.result;
                    }
                    if (x == "ip") {
                        data.result.create_time = that.GetTimeHM(
                            data.result.create_time
                        );
                        that.$bus.emit("ips", data.result);
                    }
                    if (x == "system") {
                        // console.log(data.result)
                        data.result.createTime = that.GetTimeHM(
                            data.result.createTime
                        );
                        that.$bus.emit("systems", data.result);
                    }
                };

                this.socket.onclose = function (e) { };
            },
            //获取时间
            GetTimeHM(x) {
                let my = new Date(x);
                let H = this.ZeroN(my.getHours());
                let F = this.ZeroN(my.getMinutes());
                return H + ":" + F;
            },
            //小于10前面加0
            ZeroN(x) {
                x = x > 9 ? x : "0" + x;
                return x;
            }
        }
    };
</script>

<style scoped>
    .box {
        width: 1920px;
        height: 1080px;
        position: relative;
        background: url("../assets/img/503DP01.png") center,
            url("../assets/img/503DP00.png") center;
    }

    .boxImg {
        background: #1a1a1a url("../assets/img/503DP01.png") center;
    }

    .Earthaperture {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }

    .Earthaperture>.Eart {
        position: absolute;
        left: 0%;
        top: 0%;
        width: 100%;
        height: 100%;
    }

    .Earthaperture>.aperture1 {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 944px;
        height: 944px;
        margin-top: -472px;
        margin-left: -472px;
        background: url("../assets/img/503DP06.png") no-repeat center;
        animation: haha1 60s linear infinite;
        -webkit-animation: haha1 60s linear infinite;
    }

    .Earthaperture>.aperture2 {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 872px;
        height: 872px;
        margin-top: -436px;
        margin-left: -436px;
        background: url("../assets/img/503DP07.png") no-repeat center;
        animation: haha2 70s linear infinite;
        -webkit-animation: haha2 70s linear infinite;
    }

    @-webkit-keyframes haha1 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes haha1 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }

    @-webkit-keyframes haha2 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-360deg);
        }
    }

    @keyframes haha2 {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-360deg);
        }
    }

    /* 数字 */
    .NumChild {
        position: absolute;
        top: 81px;
        left: 31px;
        width: 418px;
        height: 288px;
        background: url("../assets/img/503DP09.png");
    }

    /* .NumChild>div,.Carrierterminal>div>div{
  height: 230px;
} */
    .Carrierterminal {
        display: flex;
        justify-content: center;
    }

    .Carrierterminal>div {
        display: block;
        width: 50%;
        background: url("../assets/img/503DP11.png") no-repeat center 62px;
        background-size: 154.34px;
    }

    .title {
        padding-left: 33px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 56px;
        color: rgba(0, 217, 255, 1);
        text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
        box-sizing: border-box;
        cursor: pointer;
    }

    /*  */
    .twoChild {
        top: 396px;
        background: url("../assets/img/503DP10.png");
    }

    .Loadingcondition {
        top: 711px;
    }

    .Alarminformation {
        left: initial;
        right: 31px;
        top: 81px;
    }

    .throughput {
        left: initial;
        right: 31px;
        top: 396px;
    }

    .system {
        left: initial;
        right: 31px;
        top: 711px;
    }
</style>