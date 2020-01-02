<template>
  <div class="conversationBox">
    <div class="conversationLeft">
      <div class="search-list">
        <div>
          <span>通话时长：</span>
          <input type="text" name placeholder="不限" class="startTime" />
          <b></b>
          <input type="text" name placeholder="不限" class="endTime" />
        </div>
        <div>
          <span>主叫号码：</span>
          <input type="text" name id placeholder="不限" />
        </div>
        <div>
          <span>日期：</span>
          <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        </div>
        <div>
          <span>挂断方：</span>
          <input type="text" name id placeholder="不限" />
        </div>
        <div>
          <span>状态：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
          <span>序列</span>
          <span>呼叫时间</span>
          <span>主叫号码</span>
          <span>等待时长</span>
          <span>通话时长</span>
          <span>未接次数</span>
          <span>操作</span>
        </div>
        <div class="table-child" v-for="(item,index) in cities" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>{{index+1}}</span>
          <span>2017-10-31 23:12:20</span>
          <span>888888</span>
          <span>888s</span>
          <span>88s</span>
          <span>0</span>
          <span>删除</span>
        </div>
        <!-- <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table> -->
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
    <div class="conversationRight">
      <div>
        <PieChilds myEcharts="jt" titleName="接通率" />
        <PieChilds myEcharts="dh" titleName="掉话率" />
        <PieChilds myEcharts="hj" titleName="呼叫成功率" />
      </div>
      <div>
        <NumberChilds color="0" :endVal="99999" duration="3000" WrittenWords="当前" />
        <NumberChilds color="1" :endVal="99999" duration="3000" WrittenWords="总计" />
      </div>
      <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker> -->
    </div>
  </div>
</template>

<script>
// import Vue from "vue";
// import {
//   Button,
//   DatePicker,
//   Pagination,
//   Icon,
//   Option,
//   Select,
//   Checkbox,
//   CheckboxGroup
// } from "element-ui";
// Vue.use(DatePicker);
// Vue.use(Pagination);
// Vue.use(Icon);
// Vue.use(Option);
// Vue.use(Select);
// Vue.use(Checkbox);
// Vue.use(CheckboxGroup);
const cityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export default {
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  components: {
    PieChilds: () => import("@/components/child/PieConversation"),
    NumberChilds: () => import("@/components/child/NumberConversation")
  },
  methods: {
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
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.conversationBox {
  width: 100%;
  height: 100%;
}
.conversationLeft {
  float: left;
  width: 1136px;
  height: 100%;
  padding-left: 72px;
  box-sizing: border-box;
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
  padding: 92px 73px 0;
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
  width: 64px;
  overflow: hidden;
  padding-left: 24px;
  box-sizing: border-box;
}
.table-head > span:nth-child(2),
.table-child > span:nth-child(2) {
  width: 128px;
}
.table-head > span:nth-child(3),
.table-head > span:nth-child(7),
.table-child > span:nth-child(3),
.table-child > span:nth-child(7) {
  width: 192px;
}
.table-head > span:nth-child(4),
.table-head > span:nth-child(5),
.table-head > span:nth-child(6),
.table-child > span:nth-child(4),
.table-child > span:nth-child(5),
.table-child > span:nth-child(6) {
  width: 128px;
}
.table-head > span:nth-child(8),
.table-child > span:nth-child(8) {
  width: 104px;
}
/* sousuo  */
.search-list {
  width: 100%;
  height: 214px;
  display: -webkit-flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 85px;
  box-sizing: border-box;
}
.search-list > div {
  width: 354px;
  height: 32px;
  display: -webkit-flex;
  justify-content: flex-end;
  margin-bottom: 28px;
}
.search-list > div > span {
  display: block;
  height: 32px;
  font-size: 14px;
  letter-spacing: 2px;
  color: rgba(0, 217, 255, 1);
  line-height: 30px;
}
.search-list > div input[type="text"] {
  width: 256px;
  height: 32px;
  background: rgba(0, 217, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.14);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  border-radius: 4px;
  padding-left: 14px;
  box-sizing: border-box;
}
.search-list > div input[class="startTime"],
.search-list > div input[class="endTime"] {
  width: 112px;
  height: 32px;
  background: rgba(0, 217, 255, 0.4);
  border: 1px solid rgba(0, 0, 0, 0.14);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  border-radius: 4px;
}
.search-list > div > b {
  display: flex;
  width: 32px;
  position: relative;
}
.search-list > div > b::after {
  content: "";
  position: absolute;
  top: 17px;
  left: 50%;
  margin-left: -6px;
  width: 12px;
  height: 1px;
  background: rgba(0, 217, 255, 1);
}

/* 修改分页 */
.conversationBox /deep/ .el-pagination button:disabled,
.conversationBox /deep/ .el-pagination .btn-next,
.conversationBox /deep/ .el-pagination .btn-prev,
.conversationBox /deep/ .el-dialog,
.conversationBox /deep/ .el-pager li {
  width: 32px;
  height: 32px;
  background: rgba(0, 217, 255, 0.2);
  border: 1px solid rgba(0, 217, 255, 0.4);
  border-radius: 4px;
  text-align: center;
  font-weight: 100;
  color: rgba(0, 217, 255, 1);
  margin: 0 4px;
}
.conversationBox /deep/ .el-pagination .btn-prev,
.conversationBox /deep/ .el-pagination .btn-next {
  padding: 0;
}
.conversationBox /deep/ .el-pager li.btn-quicknext,
.conversationBox /deep/ .el-pager li.btn-quickprev {
  background: rgba(0, 217, 255, 0);
  border: 0;
}
.conversationBox /deep/ .el-pagination .btn-next .el-icon,
.conversationBox /deep/ .el-pagination .btn-prev .el-icon {
  font-size: 16px;
}
.conversationBox /deep/ .el-pager li.active {
  color: #fff !important;
  background: rgba(0, 217, 255, 0.8);
}
.conversationBox /deep/ .el-pagination button,
.conversationBox /deep/ .el-pagination span:not([class*="suffix"]) {
  font-size: 16px;
  color: rgba(0, 217, 255, 1);
}
.conversationBox /deep/ .el-pagination__editor.el-input .el-input__inner {
  height: 32px;
  background: rgba(0, 217, 255, 0.6);
  border: 1px solid rgba(0, 217, 255, 0.4);
  border-radius: 4px;
  color: rgba(0, 217, 255, 1);
}
.conversationBox /deep/ .el-pagination {
  text-align: center;
}

/*  */
.conversationBox /deep/ .el-input__inner {
  background: rgba(0, 217, 255, 0.4);
  border: 0;
  height: 32px;
  position: relative;
  color: rgba(255, 255, 255, 0.8);
}
.conversationBox /deep/ .el-input__icon {
  line-height: 32px;
}
.conversationBox /deep/ .el-checkbox__inner {
  width: 16px;
  height: 16px;
  background: transparent;
  border: 1px solid rgba(0, 217, 255, 0.4);
}
.conversationBox /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
  background: rgba(0, 217, 255, 1);
}
.conversationBox /deep/ .el-checkbox__input.is-checked + .el-checkbox__label,
.conversationBox /deep/ .el-checkbox {
  color: transparent;
}
.conversationBox /deep/ .el-table th,.conversationBox /deep/ .el-table tr{
background:transparent;
}
.conversationBox /deep/ .el-table td, .conversationBox /deep/ .el-table th.is-leaf{
  height: 53px;
  color:rgba(0,217,255,0.60);
  border-bottom:1px solid rgba(0,217,255,0.4);
}
</style>