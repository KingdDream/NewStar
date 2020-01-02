<template>
  <div class="Dbox">
    <div id="ListBox">
      <div
        class="listBoxA"
        :id="index==0?'listBoxA':index==1?'listBoxB':''"
        v-for="(item,index) in datas"
        :key="index"
        @click="fn(index)"
      >
        <span></span>
        <span>{{item.day}}</span>
        <span>{{item.hour}}</span>
        <span>{{item.warningName}}</span>
      </div>
      <div
        class="listBoxA"
        :id="ins==0?'listBoxC':ins==1?'listBoxD':''"
        v-for="(a,ins) in datas"
        :key="ins+'-'"
        @click="fn(ins)"
      >
        <span></span>
        <span>{{a.day}}</span>
        <span>{{a.hour}}</span>
        <span>{{a.warningName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: 9,
      lis1t: 6,
      //高度初始值
      num: 0,
      //滚动速度
      speed: 0.4
    };
  },
  props: ["datas"],
  mounted() {},
  watch: {
    datas() {
      this.divMation();
    }
  },
  methods: {
    divMation() {
      var that = this;
      var div = document.getElementById("ListBox");
      if (that.datas.length < 6) {
        return false;
      }

      //列表运动
      function Timer() {
        that.num += that.speed;
        if (that.num >= that.datas.length * 39) {
          that.num = 0;
        }
        div.style.marginTop = -that.num + "px";
      }
      //启动定时器
      var setTime = setInterval(Timer, 10);
      //鼠标移入清除定时器
      div.onmousemove = function() {
        clearInterval(setTime);
      };
      //鼠标移出启动定时器
      div.onmouseout = function() {
        setTime = setInterval(Timer, 10);
      };
    },
    fn(x) {
      //列表点击
      console.log(x);
    }
  }
};
</script>

<style scoped>
.Dbox {
  width: 418px;
  height: 215px;
  text-align: right;
  overflow: hidden;
  padding-bottom: 20px;
  box-sizing: border-box;
  position: relative;
  letter-spacing: 1px;
}

.Dbox .listBoxA {
  width: 312px;
  height: 39px;
  margin: auto;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 14px;
  color: rgba(0, 217, 255, 0.5);
  display: flex;
  cursor: pointer;
  justify-content: flex-start;
}
.Dbox .listBoxA:nth-child(1) {
  margin-top: 20px;
}
.Dbox .listBoxA > span:nth-child(1) {
  width: 12px;
  height: 12px;
  background: rgba(0, 217, 255, 0);
  border-radius: 50%;
}
.Dbox .listBoxA > span:nth-child(2) {
  flex-grow: 1;
}
.Dbox .listBoxA > span:nth-child(3) {
  flex-grow: 1;
}
.Dbox .listBoxA > span:nth-child(4) {
  width: 80px;
}
#listBoxA,
#listBoxC {
  color: rgba(255, 170, 0, 1);
}
.Dbox #listBoxA > span:nth-child(1),
.Dbox #listBoxC > span:nth-child(1) {
  background: rgba(255, 170, 0, 1);
}
#listBoxB,
#listBoxD {
  color: rgba(0, 217, 255, 1);
}
.Dbox #listBoxB > span:nth-child(1),
.Dbox #listBoxD > span:nth-child(1) {
  background: rgba(0, 217, 255, 1);
}
</style>     