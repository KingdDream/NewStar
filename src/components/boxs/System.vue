<template>
  <div class="conversationBox">
    <div class="conversationLeft">
      <div class="search-list">
        <span>设备数量</span>
        <span>{{25}}</span>
        <button class="btn-bt">批量删除</button>
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
          <span>设备名称</span>
          <span>运行状态</span>
          <span>运行时间</span>
          <span>操作</span>
        </div>
        <div class="table-child" v-for="(item,index) in cities" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>TradeCode 0</span>
          <span>
            <span class="state">运行中</span>
          </span>
          <span>0d 17h 58m</span>
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
    <div class="conversationRight">
      <div>
        <LineSystem data-s="200" myEcharts="A" titleName="温度状况"/>
      </div>
      <div>
        <LineSystem data-s="200" myEcharts="B"  titleName="系统负载"/>
      </div>
      <div>
        运行时间
        <span class="NumD">0</span>
        <span class="NumS">d</span>
        <span class="NumD">19</span>
        <span class="NumS">h</span>
        <span class="NumD">52</span>
        <span class="NumS">m</span>
      </div>
    </div>
  </div>
</template>

<script>
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
      isIndeterminate: true
    };
  },
  components: {
    LineSystem: () => import("@/components/child/LineSystem")
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
    }
  }
};
</script>

<style scoped>
.conversationBox {
  display: flex;
  width: 100%;
  height: 873px;
  margin: auto;
  padding: 0 72px;
  box-sizing: border-box;
  justify-content: center;
}
.conversationLeft {
  width: 744px;
  height: 100%;
}
.conversationRight {
  width: 744px;
  height: 100%;
  padding-top: 179px;
  box-sizing: border-box;
}
.conversationRight > div {
  width: 100%;
  /* height: 289px; */
  padding-left: 146px;
  box-sizing: border-box;
}
.conversationRight > div:nth-child(3) {
  font-size: 22px;
  text-align: right;
  color: rgba(0, 217, 255, 1);
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
}
.conversationRight .NumD {
  padding-left: 10px;
  font-size: 52px;
  font-family: "PangMenZhengDaoBiao";
  font-weight: 400;
  line-height: 32px;
  color: rgba(0, 217, 255, 1);
  box-sizing: border-box;
}

.conversationRight .NumD:nth-child(1) {
  padding-left: 30px;
  box-sizing: border-box;
}
.conversationRight .NumS {
  font-size: 28px;
  font-weight: 400;
  line-height: 32px;
  color: rgba(0, 217, 255, 1);
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
  width: 194px;
}
.table-head > span:nth-child(3),
.table-child > span:nth-child(3) {
  width: 190px;
}
.table-head > span:nth-child(4),
.table-child > span:nth-child(4) {
  width: 192px;
}
.table-head > span:nth-child(5),
.table-child > span:nth-child(5) {
  width: 104px;
}

/* sousuo  */
.search-list {
  width: 100%;
  height: 179px;
  display: -webkit-flex;
  justify-content: flex-start;
  padding-top: 127px;
  box-sizing: border-box;
}
.search-list > span:nth-child(1) {
  font-size: 22px;
  font-weight: 400;
  line-height: 26px;
  color: rgba(0, 217, 255, 1);
  padding-right: 24px;
  box-sizing: border-box;
  text-shadow: 0px 0px 5px rgba(0, 217, 255, 0.75);
}
.search-list > span:nth-child(2) {
  flex-grow: 1;
  font-size: 52px;
  font-family: "PangMenZhengDaoBiao";
  font-weight: 400;
  margin-top: -19px;
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
</style>