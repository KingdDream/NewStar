<template>
  <div class="Time">
    <img src="../../assets/img/503DP99.png" alt />
    <div>{{text}}</div>
    <span class="user" @click="fnUser"></span>
    <span class="set"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "接入网网管软件系统"
    };
  },
  methods:{
    fnUser(){
      this.$bus.emit("SetUp","用户管理");
    }
  }
};
</script>

<style scoped>
.Time {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 69px;
  line-height: 69px;
  background: url("../../assets/img/503DP08.png") no-repeat center;
  font-size: 26px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 2px;
  display: flex;
  letter-spacing: 6px;
  justify-content: center;
  z-index: 999;
}
.Time > div {
  position: absolute;
  left: 875px;
  top: 0;
}
.Time > .user {
  position: absolute;
  top: 36px;
  right: 41px;
  width: 24px;
  height: 24px;
  background: url("../../assets/img/503DP02.png") no-repeat center;
  cursor: pointer;
}
.Time > .set {
  position: absolute;
  top: 36px;
  right: 95px;
  width: 24px;
  height: 24px;
  background: url("../../assets/img/503DP03.png") no-repeat center;
  cursor: pointer;
}
.Time > img {
  position: absolute;
  left: 763px;
  top: 14px;
  width: 103.25px;
  height: 38.83px;
}
</style>