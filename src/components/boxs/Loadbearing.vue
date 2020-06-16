<template>
  <div id="MaskBox">
    <div>
      <span>rrc统计情况</span>
      <NumberChilds color="1" :endVal="Mydata.total?Mydata.total:0" duration="3000" WrittenWords="承载建立总数" />
      <div style="width:100%;height:0px;"></div>
      <NumberChilds color="0" :endVal="Mydata.history_total?Mydata.history_total:0" duration="3000" WrittenWords="承载历史总数" />
    </div>
    <div>
      <span>承载情况统计</span>
      <PieChilds echartsName="erab" :echartData="Mydata.build_avg_time" type="2" bg="1" color="1" dw="us" titleName="承载建立平均时间(us)" />
      <PieChilds echartsName="erab-zd" :echartData="Mydata.build_max_time" type="2" bg="1" color="1" dw="us" titleName="承载最大时间(us)" />
    </div>
    <div>
      <span>rrc时间统计</span>
      <LineLoadbearing :echartData="Mydata" type="0" echartsName="Line" />
    </div>
    <div>
      <span>承载建立统计</span>
      <PieChilds echartsName="cz" :echartData="Mydata.build_ratio" type="1" bg="1" color="2" dw="%" titleName="承载建立成功率(%)" />
      <PieChilds echartsName="pj" :echartData="Mydata.release_ratio" type="1" bg="1" color="2" dw="秒" titleName="承载释放成功率(%)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Mydata:[]
    };
  },
  components: {
    NumberChilds:() => import("@/components/child/NumberConversation"),
    PieChilds: () => import("@/components/child/PieLoadbearing"),
    LineLoadbearing:() =>import("@/components/child/Line"),
  },
  mounted(){
    this.$bus.on("bearings", val => {
      this.Mydata = val
      // console.log(val)
        });
  },
  //钩子函数在Vue 实例销毁后调用
  destroyed(){
    // this.$bus.off("bearings")
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
  width: 744px;
  height: 360px;
  background: rgba(255, 255, 255, 0.05);
  margin: 12px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-top: 72px;
  position: relative;
  box-sizing: border-box;
}
#MaskBox > div:nth-child(3){padding-top:0 }
#MaskBox > div > span {
  position: absolute;
  top: 10px;
  left: 10px;
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