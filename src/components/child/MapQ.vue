<template>
  <div id="mapBox" class="show" style="width:1920;height:1080px"></div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {};
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("mapBox"));

      let option = {
        globe: {
          //地球半径
          globeRadius: 50,
          //地球外半径
          globeOuterRadius: 10,
          // 使用地球的纹理图片
          baseTexture: staticImg.earth,
          //地球的高度纹理
          heightTexture: staticImg.bathymetry_bw_composite_4k,
          //地球顶点位移的大小。
          displacementScale: 0,
          //地球中三维图形的着色效果
          shading: "lambert",
          //配置为全景贴图
          // environment: staticImg.starfield,
          //光照相关的设置。在 shading 为 'color' 的时候无效。
          light: {
            //场景主光源的设置，在 globe 组件中就是太阳光。
            main: {
              //光源的强度
              intensity: 0.4
            },
            //全局的环境光设置。
            ambient: {
              intensity: 0.4
            }
          },
          viewControl: {
            alpha: 30,
            beta: 160,
            //开启转
            autoRotate: true,
            autoRotateAfterStill: 10,
            distance: 120,
            maxDistance:120,
            minDistance:120,
            autoRotateSpeed: 4
          },
          layers: [
            {
              type: "blend",
              blendTo: "emission",
              texture: staticImg.night
            }
            // {
            //   type: "overlay",
            //   texture: staticImg.clouds,
            //   shading: "lambert",
            //   distance: 3
            // }
          ]
        },
        series: [
          {
            // 点
            type: "scatter3D",
            //混合模式
            blendMode: "lighter",
            //该系列使用的坐标系
            coordinateSystem: "globe",
            showEffectOn: "render",
            //组件所在的层。
            zlevel: 10,
            //特效类型，目前只支持涟漪特效'ripple'。
            effectType: "ripple",
            symbol:"path://M98.655 14.829 C 96.595 17.105,96.527 20.384,98.499 22.357 C 99.324 23.181,102.587 24.129,105.749 24.463 C 131.845 27.216,150.641 39.784,161.138 61.500 C 164.880 69.242,168.000 81.525,168.000 88.517 C 168.000 92.628,170.213 95.000,174.048 95.000 C 176.027 95.000,177.465 94.220,178.557 92.553 C 179.944 90.436,180.015 88.909,179.083 81.244 C 177.697 69.845,175.732 63.289,170.918 54.000 C 163.253 39.209,151.589 27.828,136.528 20.444 C 122.695 13.662,102.430 10.657,98.655 14.829 Z M38.094 35.607 C 34.948 39.608,30.224 50.199,27.764 58.772 C 24.576 69.878,24.566 92.089,27.744 103.157 C 35.452 130.001,53.406 150.510,78.210 160.806 C 100.698 170.140,128.762 168.976,150.197 157.821 C 157.911 153.807,158.523 153.257,158.826 150.079 C 159.142 146.769,157.320 144.827,102.329 89.829 C 41.053 28.546,42.613 29.863,38.094 35.607 Z M99.000 46.000 C 96.533 48.467,96.420 52.186,98.750 54.211 C 99.713 55.048,102.897 56.000,105.827 56.328 C 121.385 58.069,134.025 70.249,135.644 85.061 C 136.414 92.108,138.225 95.000,141.868 95.000 C 147.525 95.000,149.312 89.402,146.939 79.112 C 143.053 62.255,128.382 48.297,111.109 45.021 C 103.422 43.563,101.262 43.738,99.000 46.000 Z M107.015 84.526 L 119.500 97.052 119.826 92.776 C 120.279 86.842,118.622 82.019,114.774 78.067 C 110.530 73.708,106.313 72.000,99.797 72.000 L 94.530 72.000 107.015 84.526 Z M29.550 161.900 C 19.736 181.606,19.656 181.826,21.343 184.400 L 23.046 187.000 65.323 187.000 C 96.872 187.000,107.905 186.695,108.800 185.800 C 109.460 185.140,110.000 182.215,110.000 179.300 L 110.000 174.000 104.958 174.000 C 86.967 174.000,63.834 163.948,47.998 149.250 C 43.702 145.263,40.023 142.000,39.823 142.000 C 39.623 142.000,35.000 150.955,29.550 161.900 Z",
            //标记的大小
            symbolSize:15,
            //涟漪特效相关配置。
            rippleEffect: {
              //动画的周期
              period: 4,
              //动画中波纹的最大缩放比例。
              scale: 4,
              //波纹的绘制方式，可选 'stroke' 和 'fill'
              brushType: "fill"
            },
            //图形是否不触发鼠标事件
            silent: false,
            //是否开启 hover 在拐点标志上的提示动画效果。
            hoverAnimation: false,
            itemStyle: {
              normal: {
                color: "rgba(235, 232, 6, 1)"
              }
            },
            label: {
              formatter:"{b}"
            },
            data: [
              {
                name: '新疆(乌鲁木齐)',
                value: [87.6233162400,43.8327112100]
              },
              {
                name: '云南(楚雄)',
                value: [101.5340773500,25.0511860400]
              },
              {
                name: '河北(怀来)',
                value: [115.51778,40.41538]
              },{
                name: '塞尔维亚',
                value: [21.005858999999987,44.016521]
              },{
                name: '哈萨克斯坦',
                value: [70.101453,47.985465]
              },{
                name: '印度尼西亚',
                value: [113.92132700000002,-0.789275]
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
      myChart.getZr().on("click", function(e) {
        document.getElementById("mapBox").setAttribute("class", "hide");
        that.$bus.emit("hide");
      });
    }
  }
};
</script>
<style scoped>
#mapBox {
  position: relative;
}
.show {
  animation: haha4 2s linear forwards;
  -webkit-animation: haha4 2s linear forwards;
}
.hide {
  animation: haha3 2s linear forwards;
  -webkit-animation: haha3 2s linear forwards;
}
@-webkit-keyframes haha3 {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

@keyframes haha3 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes haha4 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes haha4 {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>