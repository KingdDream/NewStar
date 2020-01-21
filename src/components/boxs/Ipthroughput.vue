<template>
  <div id="MaskBox" v-if="myData==null?show:!show">
    <div>
      <span>上下行数据流量</span>
      <Ipthroughput :datas="myData" myEcharts="A" />
    </div>
    <div>
      <span>上下行链路流量</span>
      <Ipthroughput :datas="myData" myEcharts="B" />
    </div>
    <div>
      <span>rlc上下行</span>
      <Ipthroughput :datas="myData" myEcharts="C" />
    </div>
    <div>
      <span>pdcp上下行</span>
      <Ipthroughput :datas="myData" myEcharts="D" />
    </div>
    <div>
      <span>rrc上下行</span>
      <Ipthroughput :datas="myData" myEcharts="E" />
    </div>
  </div>
</template>

<script>
import {findLatest} from "../../request/api"
export default {
  data() {
    return {
      show:false,
      myData:null
    };
  },
  components: {
    Ipthroughput:() =>import("@/components/child/LineIpthroughput"),
  },
  mounted() {this.findLatest()},
  methods: {
    findLatest(){
      findLatest().then(res => {
        this.myData = res.result
        console.log(this.myData)
        // console.log(res.result)
      }).catch(res => {
        this.$toast("数据异常请联系客服人员！");
      })
    }

  }
};
</script>

<style scoped>
#MaskBox {
  width: 1657px;
  height: 873px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-content: center;
  padding-top: 40px;
  box-sizing: border-box;
}
#MaskBox > div {
  width: 488px;
  height: 360px;
  background: rgba(255, 255, 255, 0.05);
  margin: 12px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  position: relative;
}
#MaskBox > div:nth-child(1),#MaskBox > div:nth-child(2){
width: 744px;
  height: 360px;
}
#MaskBox > div > span {
  position: absolute;
  top: 10px;
  left: 26px;
  width: 100%;
  height: 29px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 26px;
  color: rgba(0, 217, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
}
</style>