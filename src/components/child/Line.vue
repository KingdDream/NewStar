<template>
  <div :id="Echart+echartsName" class="div"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      Echart: "Echart"
    };
  },
  props: ["echartData", "type", "echartsName"],
  mounted() {
    var myChart = echarts.init(
      document.getElementById(this.Echart + this.echartsName)
    );
    var Option = {
      grid: {
        top: "20%",
        left: "30",
        right: "10%",
        bottom: "20",
        containLabel: true
      },
      tooltip: {
        trigger: "axis"
      },
      color: ["#ffaa00","#00d9ff"],
      xAxis: {
        type: "category",
        boundaryGap: true,
        data: [],
        axisLabel: {
          margin: 10,
          color: "rgba(0,217,255,0.6)",
          fontSize: "14"
        },
        axisLine: {
          // show: false
          lineStyle: {
            color: "rgb(8,123,140)", //Y轴
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
            color: "rgb(1,35,42)"
          }
        }
      },
      yAxis: [//
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
          name: "注册总数",
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
          data: []
        },
        {
          name: "注册总量",
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
          data: []
        }
      ]
    };
    myChart.setOption(Option);
    if (this.type == 0) {
      this.$bus.on("bearings", val => {
        Option.series[0].name = "承载情况";
        Option.xAxis.data.push(val.create_time);
        Option.series[0].data.push(Number(val.build_ratio));
        myChart.setOption(Option);
      });
    }
    if (this.type == 1) {
      this.$bus.on("ips", val => {
        Option.series[0].name = "IP吞吐量";
        Option.yAxis[0].axisLabel.formatter="{value} K";
        Option.xAxis.data.push(val.create_time);
        Option.series[0].data.push(Number(val.out_anc_bytes));
        myChart.setOption(Option);
      });
    }
    if (this.type == 2) {
      Option.legend = {
        orient: "horizontal",
        top: "10",
        right: "33",
        itemWidth: 13, //图例的宽度
        itemHeight: 13, //图例的高度
        textStyle: {
          color: "oblique",
          fontSize: 14
        },
        icon: "rect"
      };
      this.$bus.on("systems", val => {
        Option.series[0].name = "CPU";
        Option.series[1].name = "内存";
        Option.xAxis.data.push(val.createTime);
        Option.series[0].data.push(Number(val.avg_cpu_usage));
        Option.series[1].data.push(Number(val.mem_usage));
        myChart.setOption(Option);
      });
    }
  },
  methods: {}
};
</script>

<style scoped>
.div {
  position: absolute;
  top: 49px;
  left: 0;
  width: 100%;
  height: 82%;
}
</style>