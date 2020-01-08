<template>
  <div class="Time">
    <div class="TimeDay">{{day}}</div>
    <div class="TimeFunction">
      系统已运行
      <span>{{'23天15小时'}}</span>
    </div>
    <div class="TimeHourL">{{hour}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: "",
      hour: "",
      time: "23天15小时",
      timer:0

    };
  },
  mounted() {
   this.fn()
    
  },
  methods: {
    fn() {
      //实时时间
      setInterval(() => {
        this.timer += 1
        this.SHIJIAN();
        let my =  new Date();

        let N =  my.getFullYear();
        let Y =  my.getMonth()+1;
        let R =  my.getDate();
        this.day = N+'-'+Y+'-'+R

        let H = this.ZeroN(my.getHours())
        let F = this.ZeroN(my.getMinutes())
        let M = this.ZeroN(my.getSeconds())
        let AM = Number(H)>12?'PM':'AM'
        this.hour = AM+' '+H+':'+F+':'+M
      }, 1000);
      
    },
    SHIJIAN(){
      let x = 0;
      let y = 0;
      this.timer = parseInt(this.timer)
      let H = 60*60;
      // H = 1
      if(this.timer>H){
      let z = Math.floor(this.timer/H);
      x = Math.floor(z/24)
      y = z%24
      }else{
        y = 0
      }
      
      this.time = x+'天'+this.ZeroN(y)+'小时'
    },
    ZeroN(x){
      x = x>9?x:'0'+x
      return x;
    }
  }
};
</script>

<style scoped>
.Time {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 1920px;
  height: 68px;
  line-height: 68px;
  font-size: 22px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(0, 217, 255, 1);
  letter-spacing: 2px;
  display: flex;
  justify-content: flex-start;
}
.Time > div:nth-child(1) {
  width: 680px;
  text-align: right;
}
.Time > div:nth-child(3) {
  width: 680px;
}
.TimeFunction {
  flex-grow: 1;
  font-size: 26px;
  font-family: Microsoft YaHei;
  font-weight: normal;
  color: rgba(255, 255, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
  letter-spacing: 2px;
  text-align: center;
}
.TimeFunction span {
  font-weight: bold;
}
</style>