<template>
  <div class="conversationBox">
    <div class="conversationLeft">
      <div class="search-list">
        <div>
          <span>通话时长：</span>
          <input
            type="text"
            v-model="searchData.searchCall"
            name
            placeholder="不限"
            class="startTime"
          />
          <b></b>
          <input type="text" v-model="searchData.searchCallEnd" name placeholder="不限" class="endTime" />
        </div>
        <div>
          <span>主叫号码：</span>
          <input type="text" v-model="searchData.searchStart" id placeholder="不限" />
        </div>
        <div>
          <span>日期：</span>
          <el-date-picker
            v-model="searchData.searchDate"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </div>
        <div>
          <span>挂断方：</span>
          <input type="text" v-model="searchData.searchEnd" id placeholder="不限" />
        </div>
        <div>
          <span>状态：</span>
          <el-select v-model="searchData.searchType" placeholder="请选择">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="table-list" v-if="myData==null?false:true">
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
        <div class="table-child" v-for="(item,index) in myData" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="cities[index]" :key="index"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>{{(index+1)}}</span>
          <span>{{item.call_time}}</span>
          <span>{{item.call_num}}</span>
          <span>{{item.wait_time}}</span>
          <span>{{item.talk_time}}</span>
          <span>{{item.call_state}}</span>
          <span>删除</span>
        </div>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
      ></el-pagination>
    </div>
    <div class="conversationRight" v-if="pieData==null?false:true">
      <div>
        <PieChilds myEcharts="jt" :dates="pieData.called_ok_ratio" titleName="接通率" />
        <PieChilds myEcharts="dh" :dates="pieData.call_loss_ratio" titleName="掉话率" />
        <PieChilds myEcharts="hj" :dates="pieData.call_ok_ratio" titleName="呼叫成功率" />
      </div>
      <div>
        <NumberChilds color="0" :endVal="pieData.calling_num" duration="3000" WrittenWords="当前" />
        <NumberChilds color="1" :endVal="pieData.calling_total" duration="3000" WrittenWords="总计" />
      </div>
    </div>
  </div>
</template>

<script>
import { findLast, callDetail } from "../../request/api";
const cityOptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "已挂断"
        },
        {
          value: "2",
          label: "通话中"
        }
      ],
      currentPage: 1,
      list: 9,
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,

      multipleSelection: [],
      //接口参数
      call_num_1: null, //主叫号码
      called_num_1: null, //被叫号码
      call_time_1: null, //呼叫时间
      call_state_1: null, //呼叫状态
      startTalkTime_1: null, //通话区间
      endTalkTime_1: null, //通话区间
      missed_num_1: null, //未接次数
      pageSize: 9,
      pageTotal: 50000,
      // 搜索
      searchData: {
        searchStart:null,
        searchEnd: null,
        searchCall: null,
        searchCallEnd: null,
        searchDate: null,
        searchType: null
      },
      //接口数据
      myData: null,
      pieData: null
    };
  },
  components: {
    PieChilds: () => import("@/components/child/PieConversation"),
    NumberChilds: () => import("@/components/child/NumberConversation")
  },
  watch: {
    searchData: {
      handler(val) {
        this.currentPage = 1
        this.callDetail();
        console.log(val);
      },
      deep: true //深度监听
    }
  },
  mounted() {
    this.callDetail();
    this.findLast();
  },
  methods: {
    callDetail() {
      let json = {
        call_num: this.searchData.searchStart,
        called_num: this.searchData.searchEnd,
        call_time1: this.searchData.searchDate,
        call_state: this.searchData.searchType,
        startTalkTime: this.searchData.searchCall,
        endTalkTime: this.searchData.searchCallEnd,
        missed_num: this.missed_num_1,
        page: this.currentPage,
        size: this.pageSize
      };
      for (const key in json) {
        if (!json[key]) {
          delete json[key];
        }
      }
      callDetail(json)
        .then(res => {
          this.pageTotal = res.result.total;
          this.myData = res.result.list;
          // console.log(res.result.list);
        })
        .catch(res => {
          this.$toast("数据异常请联系客服人员！");
        });
    },
    findLast() {
      findLast()
        .then(res => {
          this.pieData = res.result;
        })
        .catch(res => {
          this.$toast("数据异常请联系客服人员！");
        });
    },
    handleCurrentChange(val) {
      this.callDetail();
      // console.log(`当前页: ${val}`);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
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
    },
    formatTime(number, format) {
      let that = this;
      var formateArr = ["Y", "M", "D", "h", "m", "s"];
      var returnArr = [];

      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(that.formatNumber(date.getMonth() + 1));
      returnArr.push(that.formatNumber(date.getDate()));

      returnArr.push(that.formatNumber(date.getHours()));
      returnArr.push(that.formatNumber(date.getMinutes()));
      returnArr.push(that.formatNumber(date.getSeconds()));

      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    },
    //数据转化
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
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
.conversationBox /deep/ .el-table th,
.conversationBox /deep/ .el-table tr {
  background: transparent;
}
.conversationBox /deep/ .el-table td,
.conversationBox /deep/ .el-table th.is-leaf {
  height: 53px;
  color: rgba(0, 217, 255, 0.6);
  border-bottom: 1px solid rgba(0, 217, 255, 0.4);
}
</style>