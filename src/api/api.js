import axios from 'axios'
// const baseUrl = "http://www.lovegf.cn:8888/api/private/v1/"
const baseUrl = "http://localhost:8888/api/private/v1/"
axios.defaults.baseURL = baseUrl
// axios拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('mytoken');
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 登录验证接口
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
