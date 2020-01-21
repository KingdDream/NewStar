<template>
  <div class="conversationBox">
    <div class="conversationLeft">
      <div class="search-list">
        <input type="search" placeholder="搜索" />
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
          <span>终端序列</span>
          <span>运行状态</span>
          <span>入网过程</span>
          <span>坐标</span>
          <span>操作</span>
        </div>
        <div class="table-child" v-for="(item,index) in cities" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>{{index}}</span>
          <span><span class="state">运行中</span></span>
          <span>2017-10-31 23:12:20</span>
          <span>31.6607006164,110.1638671567</span>
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
    }
  }
};
</script>

<style scoped>
.conversationBox {
  width: 1128px;
  height: 873px;
  margin: auto;
}
.conversationLeft {
  width: 100%;
  height: 100%;
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
  width: 128px;
  overflow: hidden;
  padding-left: 24px;
  box-sizing: border-box;
}
.table-head > span:nth-child(2),
.table-child > span:nth-child(2) {
  width: 128px;
}
.table-head > span:nth-child(3),
.table-child > span:nth-child(3) {
  width: 192px;
}
.table-head > span:nth-child(4),
.table-child > span:nth-child(4) {
  width: 320px;
}
.table-head > span:nth-child(5),
.table-child > span:nth-child(5) {
  width: 320px;
}
.table-head > span:nth-child(6),
.table-child > span:nth-child(6) {
  width: 104px;
}
/* sousuo  */
.search-list {
  width: 100%;
  height: 162px;
  display: -webkit-flex;
  justify-content:space-between;
  padding-top: 110px;
  box-sizing: border-box;
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
  box-sizing: border-box;
}
.btn-bt {
  width:83px;
  height:32px;
  background:rgba(0,217,255,0.6);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  border-radius:4px;
  cursor: pointer;
}
.state{
  position: relative;
  padding-left:14px;
  box-sizing: border-box
}
.state::after{
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  background: red;
  border-radius: 50%
}
</style>