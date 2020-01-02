<template>
  <div id="homepage">
    <div class="dl"></div>
    <div class="dlBlack"></div>
    <div class="dlBule"></div>
    <div class="dlBule1"></div>

    <div class="dlBule2">
      <div></div>
      <span>接入网网管软件系统</span>
    </div>
    <div class="dlBox">
      <span>管理员登录</span>
      <div>
        <label for="username">账号：</label>
        <input type="text" name id="username" :maxlength="maxlength" ref="username" />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" name id="password" :maxlength="maxlength" ref="password" />
      </div>
      <div style="margin: 20px 0 50px">
        <input type="checkbox" style="display:inline;" name id="checkbox" ref="checkbox" />
        <label for="checkbox" style="display:inline;vertical-align:-3px">记住我</label>
      </div>
      <div>
        <span class="btn" @click="fn">登录</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "../request/api";
export default {
  data() {
    return {
      maxlength: 16,
      msg: "first commit",
      username: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    fn() {
      if (this.$refs.username.value.length <= 0) {
        this.$toast("请输入账号！");
        return;
      }
      if (this.$refs.password.value.length <= 0) {
        this.$toast("请输入密码！");
        return;
      }
      // this.Login();
      this.$router.push({ path: "Satellite",query:{id:1} });
    },

    Login() {
      Login({
        username: this.$refs.username.value,
        password: this.$refs.password.value
      })
        .then(res => {
          if (res.result != false) {
            this.$bus.emit('MyId',res.result.id);
            this.$router.push({ path: "Satellite",query:{id:res.result.id} });
          } else {
            this.$refs.username.value = "";
            this.$refs.password.value = "";
            this.$toast("请输入正确的账号密码！");
            return;
          }
        })
        .catch(res => {
          this.$toast("数据异常请联系客服人员！");
        });
    },
   
  }
};
</script>
<style scoped>
#homepage {
  margin: auto;
  width: 1920px;
  height: 1080px;
  background: url("../assets/img/503DL00.png");
  position: relative;
}

.dl {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0) url("../assets/img/503DL01.png") no-repeat center
    545px;
}
.dlBlack {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}
.dlBule {
  position: absolute;
  top: 218px;
  left: 0;
  width: 100%;
  height: 600px;
  background: hsla(184, 100%, 50%, 0.5) url("../assets/img/503DL04.png")
    no-repeat center 515px;
}
.dlBule1 {
  position: absolute;
  top: 218px;
  left: 0;
  width: 100%;
  height: 600px;
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
  background: url("../assets/img/503DL04.png") no-repeat center 515px;
}
.dlBule2 {
  position: absolute;
  top: 218px;
  left: 0;
  width: 100%;
  height: 600px;
}
.dlBule2 span {
  display: block;
  position: absolute;
  top: 380px;
  left: 150px;
  height: 69px;
  font-size: 52px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 62px;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 5px;
  /* background-image: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    yellow,
    orange,
    red,
    orange,
    yellow,
    green,
    yellow,
    orange,
    red
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  background-clip: text; */
  -webkit-background-size: 200% 100%;
  background-size: 200% 100%;
  animation: MySignature-animation 4s infinite linear;
  -webkit-animation: MySignature-animation 4s infinite linear;
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
  box-sizing: border-box;
}
.dlBule2 > div {
  position: absolute;
  top: 142px;
  left: 140px;
  width: 403px;
  height: 171px;
  background: url("../assets/img/503DL06.png");
  display: flex;
  justify-content: center;
  align-items: center;
}
.dlBule2 > div::after {
  content: "";

  width: 373px;
  height: 141px;
  background: url("../assets/img/503DL07.png");
}
.dlBox {
  position: absolute;
  top: 218px;
  right: 0;
  width: 538px;
  padding-top: 68px;
  box-sizing: border-box;
}
.dlBox > span {
  margin-bottom: 60px;
  display: block;
  height: 41px;
  line-height: 41px;
  font-size: 41px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  letter-spacing: 10px;
  text-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
}
.dlBox > div label {
  width: 58px;
  height: 24px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(210, 210, 210, 0.87);
  letter-spacing: 2px;
}
.dlBox > div input {
  display: block;
  width: 319px;
  height: 47px;
  padding-left: 10px;
  margin: 6px 0;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(222, 222, 223, 1);
  border-radius: 4px;
  box-sizing: border-box;
}
#username {
  margin-bottom: 37px;
}
#checkbox {
  width: 21px;
  height: 21px;
}

.btn {
  margin-top: 10px;
  cursor: pointer;
  display: block;
  width: 112px;
  height: 44px;
  background: rgba(0, 237, 255, 0.8);
  border-radius: 4px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 24px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 44px;
  letter-spacing: 4px;
}
@keyframes MySignature-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
@-webkit-keyframes MySignature-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>