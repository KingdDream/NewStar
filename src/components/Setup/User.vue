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
const cityOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];
export default {
  data() {
    return {
      title: [
        { a: "用户设置", b: "#FFAA00" },
        { a: "部门设置", b: "#FFAA00" },
        { a: "权限设置", b: "#00D9FF" }
      ],
      options: [
        {
          value: "选项1",
          label: "删除用户"
        },
        {
          value: "选项2",
          label: "更改部门"
        },
        {
          value: "选项3",
          label: "更改权限"
        }
      ],
      value: "",
      currentPage3: 1,
      list: 9,
      value1: "",
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true,
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
    fnsss(a){
      console.log(1)
    },
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
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    fn() {
      this.$bus.emit("ConversationBus");
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
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