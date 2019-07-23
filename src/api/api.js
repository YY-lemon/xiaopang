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
// 获取用户数据列表
export const getUserList = params => {
  return axios.get('users', params).then(res => res.data)
}
// 添加用户
export const addUser = params => {
  return axios.post('users', params).then(res => res.data)
}
// 修改用户状态
export const editUserState = params => {
  return axios.put(`users/${params.uId}/state/${params.type}`).then(res => res.data)
}
//  根据ID查询用户信息
export const searchUserInfo = params => {
  return axios.get(`users/${params.id}`).then(res => res.data)
}
// 编辑用户提交
export const editUserSubmit = params => {
  return axios.put(`users/${params.id}`, params).then(res => res.data)
}
// 删除单个用户
export const deleteUser = params => {
  return axios.delete(`users/${params.id}`).then(res => res.data)
}
// 分配用户角色
export const grantUserRole = params => {
  return axios.put(`users/${params.id}/role`, params).then(res => res.data)
}
// 获取角色列表
export const getRoleList = params => {
  return axios.get('roles').then(res => res.data)
}
// 添加角色
export const addRoleApi = params => {
  return axios.post('roles', params).then(res => res.data)
}
// 根据ID查询角色
export const searchRoleApi = params => {
  return axios.get(`roles/${params.id}`).then(res => res.data)
}
// 编辑提交角色
export const editRoleSubmitApi = params => {
  return axios.put(`roles/${params.id}`, params).then(res => res.data)
}
// 删除角色
export const deleteRoleSubmitApi = params => {
  return axios.delete(`roles/${params.id}`).then(res => res.data)
}
// 所有权限列表
export const getRoleRightsApi = params => {
  return axios.get(`rights/${params.type}`).then(res => res.data)
}
// 角色授权
export const grantRoleRightApi = params => {
  return axios.post(`roles/${params.roleId}/rights`, params).then(res => res.data)
}
// 左侧菜单权限
export const getMenuRightApi = params => {
  return axios.get('menus').then(res => res.data)
}
// 商品列表数据
export const getGoodsDataApi = params => {
  return axios.get('goods', params).then(res => res.data)
}
// 添加商品
export const addGoodsApi = params => {
  return axios.post('goods', params).then(res => res.data)
}
// 根据ID查询商品
export const searchGoodsApi = params => {
  return axios.get(`goods/${params.id}`).then(res => res.data)
}
// 编辑提交商品
export const editGoodsSubmitApi = params => {
  return axios.put(`goods/${params.id}`, params).then(res => res.data)
}
// 删除商品
export const deleteGoodsApi = params => {
  return axios.delete(`goods/${params.id}`).then(res => res.data)
}
// 基于类型统计（饼图）
export const getPieDataApi = params => {
  return axios.get('reports/:type').then(res => res.data)
}
// 商品数据列表
export const getGoodsCategoriesApi = params => {
  return axios.get('categories', {
    params: params
  }).then(res => res.data)
}
// 添加分类
export const addCategoriesApi = params => {
  return axios.post('categories', params).then(res => res.data)
}
// 图片上传
export const uploadImgApi = params => {
  return axios.post('upload', params).then(res => res.data)
}
