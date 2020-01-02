<template>
  <div class="conversationBox">
    <div class="activebox">
      <div>
        <div v-for="(item,index) in title" :key="index" :class="active==index?'active':''" @click="ActiveTab(index)">
          <span>{{item.a}}</span>
          <span :style="{'background':item.b}">10</span>
        </div>
        
      </div>
    </div>
    <div class="conversationLeft">
      <div class="search-list">
        <div>
          <span>级别：</span>
          <el-select v-model="value" placeholder="不限">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span>日期：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div>
          <button class="btn-bt">批量删除</button>
        </div>
        <div>
          <button class="btn-bt">批量确认</button>
        </div>
      </div>
      <div class="table-list">
        <div class="table-head">
          <span>
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
            ></el-checkbox>
          </span>
          <span>终端号</span>
          <span>行为</span>
          <span>告警时间</span>
          <span>操作</span>
        </div>
        <div class="table-child" v-for="(item,index) in cities" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>{{index+1}}</span>
          <span>终端异常</span>
          <span>2017-10-31 23:12:20</span>
          <span>删除</span>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
const cityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export default {
  data() {
    return {
      title:[{a:'终端告警',b:'#FFAA00'},{a:'软件告警',b:'#FFAA00'},{a:'接入网状态',b:'#00D9FF'},{a:'操作日志',b:'#FFAA00'}],
      options: [
        {
          value: "选项1",
          label: "1"
        },
        {
          value: "选项2",
          label: "2"
        },
        {
          value: "选项3",
          label: "3"
        },
        {
          value: "选项4",
          label: "4"
        },
        {
          value: "选项5",
          label: "5"
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
      active:0,
    };
  },
  components: {
    PieChilds: () => import("@/components/child/PieConversation"),
    NumberChilds: () => import("@/components/child/NumberConversation")
  },
  methods: {
    ActiveTab(i){
      this.active = i
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
  width: 1384px;
  height: 121px;
  margin: auto;
  border-bottom: 1px solid rgba(0, 219, 255, 0.5);
  box-sizing: border-box;
}
.activebox > div {
  width: 1128px;
  padding-top: 88px;
  display: flex;
  margin: auto;
  box-sizing: border-box;
}
.activebox > div > div {
  padding: 0 40px;
  height: 24px;
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  color: rgba(0, 219, 255, 0.5);
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
}
.activebox > div > div::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 100%;
  background: rgba(0, 219, 255, 0.4);
}
.activebox > div > div:last-child::after {
  display: none;
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
  width: 100px;
  height: 2px;
  background: rgba(0, 217, 255, 1);
  margin-left: -50px;
}
.conversationLeft {
  width: 1128px;
  height: 751px;
  margin: auto;
}
.conversationRight {
  float: left;
  width: 521px;
  height: 100%;
}
.conversationRight > div:nth-child(1) {
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 73px 0;
  box-sizing: border-box;
}
.table-list {
  width: 100%;
  height: 539px;
  margin-bottom: 51px;
}
/* table */
.table-head {
  height: 54px;
  background: rgba(0, 217, 255, 0.4);
  opacity: 1;
  border-radius: 4px 4px 0px 0px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 53px;
  color: rgba(0, 217, 255, 1);
  display: flex;
}
.table-child {
  height: 53px;
  border-bottom: 1px solid rgba(0, 217, 255, 0.4);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 53px;
  color: rgba(0, 217, 255, 0.6);
  display: flex;
}
.table-head > span,
.table-child > span {
  display: block;
}
.table-head > span:nth-child(1),
.table-child > span:nth-child(1) {
  width: 192px;
  overflow: hidden;
  padding-left: 24px;
  box-sizing: border-box;
}
.table-head > span:nth-child(2),
.table-child > span:nth-child(2) {
  width: 256px;
}
.table-head > span:nth-child(3),
.table-child > span:nth-child(3) {
  width: 256px;
}
.table-head > span:nth-child(4),
.table-child > span:nth-child(4) {
  width: 320px;
}
.table-head > span:nth-child(5),
.table-child > span:nth-child(5) {
  width: 104px;
}
/* sousuo  */
.search-list {
  width: 100%;
  height: 92px;
  display: -webkit-flex;
  justify-content: flex-start;
  padding-top: 40px;
  box-sizing: border-box;
}
.search-list > div:nth-child(1) {
  width: 366px;
}
.search-list > div:nth-child(2) {
  flex-grow: 1;
}
.search-list > div:nth-child(3) {
  width: 113px;
}
.search-list > div > span {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(0, 217, 255, 1);
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
.state {
  position: relative;
  padding-left: 14px;
  box-sizing: border-box;
}
.state::after {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 50%;
}
/*  */
.conversationBox /deep/ .el-select,
.conversationBox /deep/ .el-date-editor.el-input {
  width: 256px;
}
/*  */
</style>