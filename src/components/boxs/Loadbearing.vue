<template>
  <div id="MaskBox">
    <div>
      <span>rrc统计情况</span>
      <PieChilds myEcharts="jl" type="1" bg="1" color="1" dw titleName="建立连接数" />
      <PieChilds myEcharts="zd" type="1" bg="2" color="2" dw titleName="中断连接数" />
    </div>
    <div>
      <span>承载情况统计</span>
      <PieChilds myEcharts="erab" type="2" bg="1" color="1" dw titleName="erab承载" />
      <PieChilds myEcharts="erab-zd" type="2" bg="2" color="1" dw titleName="建立成功数量" />
    </div>
    <div>
      <span>rrc时间统计</span>
      <LineLoadbearing datas="200" myEcharts="LineLoadbearing" />
    </div>
    <div>
      <span>承载建立统计</span>
      <PieChilds myEcharts="cz" type="1" bg="1" color="1" dw="%" titleName="承载建立成功率" />
      <PieChilds myEcharts="pj" type="2" bg="2" color="1" dw="秒" titleName="平均最大时间" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {
    PieChilds: () => import("@/components/child/PieLoadbearing"),
    LineLoadbearing:() =>import("@/components/child/LineLoadbearing"),
  },
  methods: {}
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