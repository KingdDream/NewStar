<template>
  <div :id="Echart+echartsName" class="div"></div>
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
  props: ["echartsName", "type"],
  mounted() {
    let that = this;
    let myChart = this.$echarts.init(
      document.getElementById(this.Echart + this.echartsName)
    );
    let option = {
      color: ["#00d9ff", "#ffaa00"],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {d}%"
      },
      legend: {
        orient: "vertical",
        x: "center",
        y: "70%",
        // icon:'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACa0lEQVRIS8WXQXYSQRCGv0IfLiUnCFnojCvJCSQ3SE4gnkByAuEEwgmMJxBPIJxAXBmySbwBbH2+qbyaZsIA3cMMEq0Vw3TX31X1d9U/Qlmb6TnCGxJaQBOhudw6RZlTY0rCmFi+lnEphYtutcFv3gNdoFHGITAHBtQZciL222th4BvtoHysALgOoNwhXBLJyIfsB77WAZJGegjrEUl/09E28EyvgLeHQMz5uCKSd3mf68CHjXTz7H0i6WV/roBdTT8VRqpMEMbUGPOUabr2Dy0S2ijtlPXFdpHV3AE79t4WEGkBdEJEecC61i6CRfXci2+Ei+XE3jngmdriD4HFE55xXnQ11vb91CY1jMmvA8GnKc+A7b75TrmgTrM0aIbkwK0UPp9zIjkSrCPBl8DpHmpSmeUu7dYHtk04FUJMNiLF0q4MmN8wU4t6O+XK0IDHATau0X+vA4S4o0wM2Frb8ZbjGme8kPFegNmmUBlT4Jmq13mdo8qk2nTkSGbXdNPmjwt8oy2U7x7ghQH7CfDoqf6P5PKPQE3VxNlfksufTegXNxDlklgGe4HvbCCuV4da5pyEU17JXSVwR6pvgaGzIJLG7iFBKuIuSoM7UBuvJgq3bZnF/Fi0qPzjzASc0iOWYWHkLr025fzCUPlFLKk6XQmB4mGR4RlZRigmaX/whAYJx0ganQ0bf5Sr024IgVWLC8/lSkUOpzh786/E3mci6eSP45e3RYqkauSBKxkW9FZzxZrL9uQqA25EErrVBP36MLe62ydMiPGbx1gsb0Bh4yn+dsq7tPuZYHVyzHVMJmW4ezZBMeKluOcddg/XafPbxk2btQAAAABJRU5ErkJggg==',
        // itemWidth:15,
        // itemHeight:15,
        // icon:'path://M1 248 c0 -38 3 -47 9 -33 9 23 58 70 80 78 8 3 -9 6 -37 6 l-53 1 1 -52z,M210 293 c23 -9 51 -35 71 -68 l19 -30 0 53 0 52 -52 -1 c-29 0 -46 -3 -38 -6z,M92 207 c-50 -53 -13 -137 59 -137 47 0 79 34 79 81 0 71 -90 107 -138 56z,M1 53 l-1 -53 53 0 52 0 -30 19 c-33 20 -59 48 -68 71 -3 8 -6 -9 -6 -37z,M278 70 c-9 -16 -32 -39 -50 -50 l-33 -20 53 0 52 0 0 50 c0 28 -1 50 -2 50 -2 0 -11 -14 -20 -30z ',
        formatter: function(name) {
          return name + " " + that.MyName[name];
        },
        textStyle: {
          color: "oblique"
        }
      },
      series: [
        {
          type: "pie",
          center: ["50%", "36%"],
          radius: ["39%", "55%"],
          itemStyle: {
            // color:
          },
          label: {
            normal: {
              show: false,
              position: "center"
            }
          },
          data: []
        }
      ]
    };
    myChart.setOption(option);
    if (Number(that.type) == 0) {
      that.$bus.on("beamTimeslot", val => {
        that.Mydata = [
          {
            name: "已用时隙",
            value: val.using_slots
          },
          {
            name: "未用时隙",
            value: val.usable_slots
          }
        ];
        that.Mydata.forEach((item, index) => {
          that.MyName[item.name] = item.value;
        });
        option.series[0].data = that.Mydata;
        myChart.setOption(option);
      });
    }
    if (Number(that.type) == 1) {
      that.$bus.on("ue", val => {
        that.Mydata = [
          {
            name: "入网",
            value: val.offline
          },
          {
            name: "未开机",
            value: val.online
          }
        ];
        that.Mydata.forEach((item, index) => {
          that.MyName[item.name] = item.value;
        });
        option.series[0].data = that.Mydata;
        myChart.setOption(option);
      });
    }
  },
  methods: {
    fn() {}
  }
};
</script>

<style scoped>
.div {
  width: 209px;
  height: 230px;
}
</style>