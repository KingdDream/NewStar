<template>
  <div class="divpie">
    <div :id="Echart+echartsName" class="div"></div>
    <span class="span">{{titleName}}</span>
    <span class="spanNum" :style="{'color':color==1?'#00d9ff':'#ffaa00'}">{{echartData?echartData:0}}<span></span></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Echart: "Echart",
      Mydata: [],
      MyName: {},
    };
  },
  props: ["echartsName", "echartData","type","bg","color", "titleName","dw"],
  mounted() {
    let that = this;
    let myChart = this.$echarts.init(
      document.getElementById(this.Echart + this.echartsName)
    );
    let option = {
      color: [that.bg==1?"#00d9ff":"#ffaa00","#0c7f93",],
      series: [
        {
          type: "pie",
          hoverAnimation: false,
          radius: [that.type==1?"70%":"80%", "99%"],
          itemStyle: {
            // color:
          },
          label: {
            normal: {
              show: false,
              position: "center"
            }
          },
          data: [
            {
              value: 80,
              name: "已使用"
            },
            {
              name: "未使用",
              value: that.type==1?20:0
            }
          ]
        }
      ]
    };
    myChart.setOption(option);
  },
  methods: {
    fn() {}
  }
};
</script>

<style scoped>
.div {
  position: absolute;
  top: 0;
  z-index:2;
  width: 192px;
  height: 192px;
}
.divpie {
  width: 192px;
  position: relative;
  padding-top: 192px;
  box-sizing: border-box
}
.span {
  display: block;
  height: 100px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  padding-top: 20px;
  color: rgba(0, 217, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
  box-sizing: border-box;
}
.spanNum {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 192px;
  height: 192px;
  text-align: center;
  font-size: 46px;
  font-weight: 400;
  line-height: 192px;
  /* color: rgba(0, 217, 255, 1); */
  font-family: "PangMenZhengDaoBiao";
  /* text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75); */
}
.spanNum>span{
  font-size: 16px;
  font-family:'Microsoft Yahei', '微软雅黑', Arial, 'Helvetica Neue', 'Helvetica, sans-serif';
}
</style>