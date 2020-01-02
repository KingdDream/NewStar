<template>
  <div :class="color==0?'NumConcent':'NumConcent1'">
    <span class="concent">{{WrittenWords}}</span>
    <span class="num">
      <countTo :startVal="startVal" :endVal="Number(endVal)" :duration="Number(duration)"></countTo>
    </span>
  </div>
</template>

<script>
//cnpm install --save vue-count-to
import countTo from "vue-count-to";
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
    };
  },
  props: ["endVal", "color","duration","WrittenWords"]
};
</script>

<style scoped>
@import "../../assets/css/font.css";
.NumConcent,
.NumConcent1 {
  width: 320px;
  height: 60px !important;
  text-align: right;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 35px;
  position: relative;
}
.NumConcent::after,
.NumConcent1::after {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 320px;
  height: 5px;
  background: rgba(0, 217, 255, 0.5);
}
.NumConcent::before,
.NumConcent1::before {
  position: absolute;
  bottom: 0;
  right: 0%;
  content: "";
  width: 0px;
  height: 5px;
  background: rgba(0, 217, 255, 1);
  box-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
  animation: widthAnimation 5s infinite linear;
  -webkit-animation: widthAnimation 5s infinite linear;
}
.NumConcent > .concent,
.NumConcent1 > .concent {
  position: absolute;
  top: 12px;
  left: 0%;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0, 217, 255, 1);
}
.NumConcent > .num,
.NumConcent1 > .num {
  font-family: "PangMenZhengDaoBiao";
  font-size: 48px;
  letter-spacing: 6px;
  color: rgba(0, 217, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
}
.NumConcent1::after {
  background: rgba(255, 170, 0, 0.5);
}
.NumConcent1::before {
  background: rgba(255, 170, 0, 1);
  box-shadow: 0px 0px 5px rgba(255, 170, 0, 0.75);
  animation: widthAnimation 10s infinite linear;
  -webkit-animation: widthAnimation 10s infinite linear;
}
.NumConcent1 > .concent {
  color: rgba(255, 170, 0, 1);
}
.NumConcent1 > .num {
  color: rgba(255, 170, 0, 1);
  text-shadow: 0px 0px 5px rgba(255, 170, 0, 0.75);
}
@keyframes widthAnimation {
  0% {
    width: 0px;
  }
  100% {
    width: 100%;
  }
}
@-webkit-keyframes widthAnimation {
  0% {
    width: 0px;
  }
  100% {
    width: 100%;
  }
}
</style>