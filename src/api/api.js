import { get, post } from './http'

//验证用户是否登录
export const checkLogin = () => get('./index/Index/checkLogin')

//登录
export const login = (params) => post('./index/Index/login', params)

//退出登录
export const logout = () => get('./index/Index/logout')

//获取验证码
export const getVerify = () => get('./index/Index/verify')

//注册
export const register = (params) => post('./index/Users/add', params)

//修改个人信息
export const editUsers = (params) => post('./index/Users/edit', params)

//注销用户
export const deleteUsers = (params) => post('./index/Users/delete', params)

//获取导航菜单
export const getNavMenu = () => get('./index/Navs/getNavsMenu')

//添加导航菜单
export const addNavMenu = (params) => post('./index/Navs/add', params)

//编辑导航菜单
export const editNavMenu = (params) => post('./index/Navs/edit', params)

//删除导航菜单
export const deleteNavMenu = (params) => post('./index/Navs/delete', params)

//上传文件
export const uploads = (params) => post('./index/Common/uploads', params)

//文章列表
export const getArticleList = () => get('./index/Article/getList')

//发布文章
export const addArticle = (params) => post('./index/Article/add', params)

//编辑文章
export const editArticle = (params) => post('./index/Article/edit', params)

//删除文章
export const deleteArticle = (params) => post('./index/Article/delete', params)

//我的收藏
export const getCollectionList = (params) => get('./index/Collection/getList', params)

//添加收藏
export const addCollection = (params) => post('./index/Collection/add', params)

//取消收藏
export const deleteCollection = (params) => post('./index/Collection/delete', params)

