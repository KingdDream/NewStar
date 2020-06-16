<template>
  <div :id="Echart+echartsName" class="div"></div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      Echart: "Echart",
      myDataA: [],
      myDataB: [],
      myDataC: []
    };
  },
  props: ["echartData", "echartsName"],
  mounted() {
    this.fn();
  },
  methods: {
    fn() {
      var that = this;

      that.echartData.forEach((a, b) => {
        that.myDataA.push(a.create_time.split(' ')[1]);
        if (that.echartsName == "A") {
          that.myDataB.push(a.out_anc_bytes);
          that.myDataC.push(a.in_anc_bytes);
        }
        if (that.echartsName == "B") {
          that.myDataB.push(a.to_mod_bytes);
          that.myDataC.push(a.from_demod_bytes);
        }
        if (that.echartsName == "C") {
          that.myDataB.push(a.out_rlc_bytes);
          that.myDataC.push(a.in_rlc_bytes);
        }
        if (that.echartsName == "D") {
          that.myDataB.push(a.out_pdcp_bytes);
          that.myDataC.push(a.in_pdcp_bytes);
        }
        if (that.echartsName == "E") {
          that.myDataB.push(a.out_rrc_bytes);
          that.myDataC.push(a.in_rrc_bytes);
        }
      });

      var myChart = echarts.init(
        document.getElementById(this.Echart + this.echartsName)
      );
      var Option = {
        grid: {
          top: "20%",
          left: "30",
          right: "10%",
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
          itemWidth: 15, //图例的宽度
          itemHeight: 15, //图例的高度
          itemGap: 50,
          textStyle: {
            fontSize: 14,
            color: "oblique"
          }
        },
        color: ["#ffaa00", "#00d9ff"],
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: that.myDataA,
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
              formatter: "{value} Kbytes",
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
        dataZoom: [{
        type: 'inside',
        start: 0,
        end: 20
    }],
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
            data: that.myDataB
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
            data: that.myDataC
          }
        ]
      };
      myChart.setOption(Option);
    }
  }
};
</script>

<style scoped>
.div {
  width: 100%;
  height: 100%;
}
</style>