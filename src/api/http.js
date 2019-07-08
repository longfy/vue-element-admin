import axios from 'axios';
import config from '../config/config'
import qs from 'qs'

let { developmentUrl, testUrl, productionUrl } = config

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = developmentUrl //访问的api前缀
} else if (process.env.NODE_ENV == 'test') {
    axios.defaults.baseURL = testUrl //访问的api前缀
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = productionUrl //访问的api前缀
}

// axios.defaults.baseURL = apisite //访问的api前缀
axios.defaults.timeout = 10000; //请求超时时间
axios.defaults.withCredentials = true; //每次请求携带cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export function get(url, params) {
    // let params = JSON.stringify(params)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then((res) => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}

export function post(url, params) {
    // let params = JSON.stringify(params)
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params))
            .then((res) => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
    })
}

// await fetch(apisite + '/index/Index/login',{
//     method: 'POST',
//     body: data,
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     credentials: 'same-origin',
//     mode: 'cors'
// }).then(res => res.json())
// .then(res => {
//     message.success(res.msg);
// })
