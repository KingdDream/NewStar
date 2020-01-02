<template>
  <div class="div"> 
    <span>{{titleName}}</span>
    <div :id="Echart+myEcharts"></div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      Echart: "Echart"
    };
  },
  props: ["datas", "myEcharts","titleName"],
  mounted() {
    var myChart = echarts.init(
      document.getElementById(this.Echart + this.myEcharts)
    );
    var Option = {
      grid: {
        top: "25",
        left: "0",
        right: "0",
        bottom: "56",
        containLabel: true
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        x: "center",
        y: "320",
        icon: "rect",
        itemWidth: 16, //图例的宽度
        itemHeight: 16, //图例的高度
        itemGap:40,
        textStyle: {
          fontSize: 14,
          color: "oblique"
        }
      },
      color: ["#ffaa00", "#00d9ff"],
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: [1, 2, 3, 4, 5],
        axisLabel: {
          margin: 10,
          color: "rgba(0,217,255,0.6)",
          fontSize: "14"
        },
        axisLine: {
          // show: false
          lineStyle: {
            color: "rgba(8,123,140,0.5)", //Y轴
            width: 1
          }
        },
        boundaryGap: true,
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "rgba(1,35,42,0.1)"
          }
        }
      },
      yAxis: [
        {
          type: "value",
          position: "left",
          axisLabel: {
            margin: 15,
            color: "rgba(0,217,255,0.6)", //文字
            formatter: "{value} %",
            fontSize: "14"
          },
          axisTick: {
            show: true,
            length: 0,
            lineStyle: {
              color: "rgb(6,67,79)"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgb(6,67,79)"
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgb(6,67,79)", //Y轴
              width: 0
            }
          }
        }
      ],
      series: [
        {
          name: "平均等待",
          type: "line",
          smooth: true, //是否平滑曲线显示
          showAllSymbol: true,
          symbol: "none", //circle
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "rgb(255,170,0)" // 线条颜色
            }
          },
          label: {
            show: false,
            position: "top"
          },
          itemStyle: {
            borderWidth: 1
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(255,170,0,0.5)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255,170,0,0)"
                  }
                ],
                false
              )
            }
          },
          data: [15, 20, 10, 60, 90]
        },
        {
          name: "最大等待",
          type: "line",
          smooth: true, //是否平滑曲线显示
          showAllSymbol: true,
          symbol: "none", //circle
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: "rgb(0,217,255)" // 线条颜色
            }
          },
          label: {
            show: false,
            position: "top"
          },
          itemStyle: {
            borderWidth: 1
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0,217,255,0.5)"
                  },
                  {
                    offset: 1,
                    color: "rgba(0,217,255,0)"
                  }
                ],
                false
              )
            }
          },
          data: [5, 40, 20, 80, 70]
        }
      ]
    };
    myChart.setOption(Option);
  }
};
</script>

<style scoped>
.div {
  width: 100%;
  height:289px;
}
.div>span{
  font-size:22px;
font-weight:400;
line-height:26px;
color:rgba(0,217,255,1);
text-shadow:0px 0px 5px rgba(0,217,255,0.75);
}
.div>div{
  width: 100%;
  height:260px;
}
</style>