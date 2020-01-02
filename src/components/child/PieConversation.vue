<template>
  <div class="divpie">
    <div :id="Echart+myEcharts" class="div"></div>
    <span class="span">{{titleName}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Echart: "Echart",
      Mydata: [],
      MyName: {}
    };
  },
  props: ["myEcharts", "type","titleName"],
  mounted() {
    let that = this;
    let myChart = this.$echarts.init(
      document.getElementById(this.Echart + this.myEcharts)
    );
    let option = {
      title: {
        text: "80%",
        x: "center",
        y: "center",
        textStyle: {
          fontWeight: "normal",
          color: "#00d9ff",
          fontFamily: "PangMenZhengDao",
          fontSize: "30"
        }
      },
      color: ["#00d9ff", "#0c7f93"],
      series: [
        {
          type: "pie",
          hoverAnimation: false,
          // center: ["50%", "36%"],
          radius: ["70%", "99%"],
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
              value: 20
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
  width: 144px;
  height: 144px;
}
.divpie{
  width: 144px;
}
.span {
  display: block;
  height: 100px;
  width: 100%;
  text-align: center;
  font-size: 26px;
  font-weight: 400;
  line-height: 50px;
  color: rgba(0, 217, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
}
</style>