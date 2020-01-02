/**
 * @Author              : wanghw
 * @Date                : 2019/3/25 - 17:44
 * @PROJECT_NAME        : Examination
 * @FileName            : index
 * @Last Modified       : 2019/3/25 - 17:44 - wanghw
 */
import toast from './toast'
//空对象
const Toast = {};
let isToast = true;
//构建插件的时候 必须有个属性叫做 install 接收一个参数 Vue --实例
Toast.install = function (Vue) {
    Vue.prototype.$toast = function (msg, showTime = 1000) {
        if (isToast) {
            isToast = false
            let dom = document.createElement('div');
            let T = Vue.extend(toast);

            let t = new T().$mount(dom);
            t.msg = msg;

            document.body.appendChild(t.$el);

            setTimeout(function () {
                document.body.removeChild(t.$el);
                isToast = true
            }, showTime)
        }
    }
};


export default Toast
