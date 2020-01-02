<template>
  
    <div class="conversationLeft">
      <div class="search-list">
        <div>
          <span>级别：</span>
          <input type="search" name id placeholder="搜索" />
        </div>
        <div></div>
        <div></div>
        <div>
          <el-select v-model="value" placeholder="批量操作">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
              @click="fnsss(index)"
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
          <span>编号</span>
          <span>部门</span>
          <span>人数</span>
          <span>创建时间</span>
          <span>操作</span>
        </div>
        <div class="table-child" v-for="(item,index) in cities" :key="index">
          <span>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox :label="item" :key="item"></el-checkbox>
            </el-checkbox-group>
          </span>
          <span>{{index-index+1}}</span>
          <span>北京</span>
          <span>99</span>
          <span>2019-11-19  17:32</span>
          <span>
            <span>设置</span>
            <span>删除</span>
          </span>
        </div>
        <div class="table-child created-child" v-if="tableShow">
          <span></span>
          <span></span>
          <span>
            <el-select v-model="value" placeholder="批量操作">
              <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </span>
          <span>
            <input type="text" name class="test" placeholder="人数"/>
          </span>
          <span></span>
          <span>
            <span @click="AddFn">添加</span>
            <span @click="CancelFn">取消</span>
          </span>
        </div>
        <div class="table-created" v-if="!tableShow">
          <span @click="crtatedFn()" style="cursor:pointer">+ 添加用户</span>
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
    PieChilds: () => import("@/components/child/PieConversation"),
    NumberChilds: () => import("@/components/child/NumberConversation")
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
.conversationLeft {
  width: 744px;
  height: 751px;
  margin: auto;
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
.table-created {
  margin-top: 10px;
  height: 32px;
  border: 1.4px dashed rgba(0, 217, 255, 0.4);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  border-radius: 8px;
  line-height: 32px;
  text-align: center;
  color: rgba(0, 217, 255, 0.6);
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
.table-child > span:nth-child(2),
.table-head > span:nth-child(3),
.table-child > span:nth-child(3),
.table-head > span:nth-child(4),
.table-child > span:nth-child(4) {
  width: 128px;
}
.table-head > span:nth-child(5),
.table-child > span:nth-child(5) {
  width: 192px;
}
.table-head > span:nth-child(6),
.table-child > span:nth-child(6) {
  width: 104px;
}
.table-child > span:nth-child(6) > span:nth-child(1) {
  padding-right: 8px;
  border-right: 1px solid #00d9ff;
  cursor: pointer;
  box-sizing: border-box;
}
.table-child > span:nth-child(6) > span:nth-child(2) {
  padding-left: 8px;
  cursor: pointer;
  box-sizing: border-box;
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
.search-list > div:nth-child(4) {
  width: 100px;
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