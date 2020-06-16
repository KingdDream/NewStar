<template>
  <div class="conversationBox">
    <div class="activebox">
      <div>
        <div
          v-for="(item,index) in title"
          :key="index"
          :class="active==index?'active':''"
          @click="ActiveTab(index)"
        >
          <span>{{item.a}}</span>
        </div>
      </div>
    </div>
    <Userchild-a v-if="active==0?true:false"/>
    <Userchild-b v-if="active==1?true:false"/>
    <Userchild-c v-if="active==2?true:false"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: [
        { a: "用户设置", b: "#FFAA00" },
        { a: "部门设置", b: "#FFAA00" },
        { a: "权限设置", b: "#00D9FF" }
      ],
      
      active: 0,
      tableShow: false
    };
  },
  components: {
    'Userchild-a': () => import("@/components/Setup/Userchilda"),
    'Userchild-b': () => import("@/components/Setup/Department"),
    'Userchild-c': () => import("@/components/Setup/Jurisdiction"),
  },
  methods: {
    
    AddFn(){
      this.tableShow = !this.tableShow;
    },
    CancelFn(){
      this.tableShow = !this.tableShow;
    },
    crtatedFn() {
      this.tableShow = !this.tableShow;
    },
    ActiveTab(i) {
      this.active = i;
    },
  }
};
</script>

<style scoped>
.conversationBox {
  width: 100%;
  height: 873px;
}
.activebox {
  width: 1512px;
  height: 121px;
  margin: auto;
  border-bottom: 1px solid rgba(0, 219, 255, 0.5);
  box-sizing: border-box;
}
.activebox > div {
  width: 100%;
  padding-top: 88px;
  display: flex;
  margin: auto;
  box-sizing: border-box;
}
.activebox > div > div {
  width: 168px;
  height: 24px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 219, 255, 0.5);
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}

.activebox > div > div > span:nth-child(2) {
  display: inline-block;
  width: 38px;
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  color: rgba(255, 255, 255, 1) !important;
  border-radius: 20px;
  text-align: center;
}
.active {
  color: rgba(0, 217, 255, 1) !important;
}
.active > span:nth-child(1) {
  position: relative;
}
.active > span:nth-child(1)::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 168px;
  height: 2px;
  background: rgba(0, 217, 255, 1);
  margin-left: -84px;
}

.btn-bt {
  width: 83px;
  height: 32px;
  background: rgba(0, 217, 255, 0.6);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}
input {
  width: 256px;
  height: 32px;
  background: rgba(0, 217, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.14);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  border-radius: 4px;
  padding-left: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.created-child>span{
  padding-right: 24px !important;
  box-sizing: border-box
}
.state {
  position: relative;
  padding-left: 14px;
  box-sizing: border-box;
}
/*  */
.conversationBox /deep/ .el-select,
.conversationBox /deep/ .el-date-editor.el-input,
input[class='test'] {
  width: 100%;
}
/*  */
</style>