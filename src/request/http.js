/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import Vue from 'vue'
import axios from 'axios';
import QS from 'qs';


// 环境的切换
if (process.env.NODE_ENV == 'production') {
    // npm run build test
    if (process.env.PLATFORM == 'test') {
        //测试环境
        axios.defaults.baseURL = '';
    } else if (process.env.PLATFORM == 'pro') {
        //正式环境
        axios.defaults.baseURL = '';
    }
} else if (process.env.NODE_ENV == 'development') {
    //开发环境
    axios.defaults.baseURL = 'http://192.168.43.201:8080'
}


// 请求超时时间
// axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器 
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.error(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    // 服务器状态码不是200的情况
    error => {
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params)).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err)
        })
    });
}
function getParams(param) {
    let _v = window.location.href;

    // var _v = 'http://192.168.10.97:8081/#/testPaperContainer?userId=6ee5dae1-cb68-4fe5-a71f-0cce68d79b26&curChangeOrg=6ee5dae1-cb68-4fe5-a71f-0cce68d79b26'
    let ret = {};
    let seg = []
    let segArr = _v.split('?')
    for (let i in segArr) {
        if (i != 0) {
            seg.push(segArr[i])
        }
    }
    seg[0] = seg[0].split('#')[0]
    let newSeg = []
    seg.forEach((item) => {
        item.split('&').forEach((ite) => {
            newSeg.push(ite)
        })
    })
    newSeg.forEach(function (element, index) {
        let idx = element.indexOf('=');
        let key = element.substring(0, idx).toLowerCase();
        let val = element.substring(idx + 1);
        ret[key] = val;
    });
    return ret[param.toLowerCase()] || "";

}
function goodData(x){
    return JSON.parse(JSON.stringify(x))
}
function windowOpen(y){
    let x = 'http://192.168.43.201:8080/'
    let z = '/toExcel'
    window.open(x+y+z)
}
Vue.prototype.$getParams = getParams
//数据优化
Vue.prototype.$goodData = goodData
//数据优化
Vue.prototype.$windowOpen = windowOpen
// Vue.prototype.$observer = observer
Vue.prototype.$axios = axios
