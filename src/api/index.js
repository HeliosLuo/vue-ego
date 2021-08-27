/***
 * 请求的方法
 */
import base from './config';
import axios, { get, post } from '../utils/request';

const api = {
    /**
     * 登录请求 username password
     */
    getLogin(params) {
        // return axios.post(base.login,params)
        return post(base.login, params)
    },
    /**
     * 注册接口
     */
    getRegister(params) {
        return post(base.register, params)
    },
    /**
     * 商品列表接口 projectList {page:1}
     */
    getProductList(params) {//{page:xx}
        return get(base.projectList, params)
    },
    /**
     * 搜索
     */
    getSearch(params) {
        return axios.get(base.search, {
            params
        })
    },
    getSelectCategory(params) {
        return get(base.selectCategory, params)
    },
    /**
     * 商品添加
     */
    getInsertTbItem(params) {
        return get(base.insertTbItem, params)
    },
    /**
     * 删除
     */
    getDeleteGoods(params) {
        return get(base.deleteGoods, params)
    },
    /**
     * 批量删除
     */
    getBatchDelete(params) {
        return get(base.batchDelete, params)
    },
    /**
     * 修改商品
     */
    getUpdateTbItem(params) {
        return get(base.updateTbItem, params)
    },
    /**
     * 规格列表
     * 
     */
    getParams(params) {
        return get(base.getParams, params)
    },
    /**
     * 添加规格列表
     */
    getItemParam(params) {
        return get(base.itemParam, params)
    },
    /**
     * 规格列表删除
     */
    getParamsDelete(params) {
        return get(base.paramsDelete, params)
    },
    /**
     * 规格查询
     */
    getParamsSearch(params) {
        return get(base.paramsSearch, params)
    },
    /**
     * 规格编辑
     */
    getParamsCategory(params) {
        return get(base.paramsCategory, params)
    },
    /**
     * 规格回显类目选择
     */
    getCategoryData(params) {
        return get(base.categoryData, params)
    },
    /**
     * 广告内容
     */
    getAdvertlist(params) {
        return get(base.getAdvertlist, params)
    },
    /**
     * 添加广告
     */
    addvertChild(params) {
        return get(base.addvertChild, params)
    },
    /**
     * 查询广告
     */
    addAdvertContent(params) {
        return get(base.addAdvertContent, params)
    },
    /**
     * 修改子广告
     */
     updateContent(params){
        return get(base.updateContent,params)
     },
     /**
      * 删除子广告
      */
      deleteContent(params){
          return get(base.deleteContent,params)
      },
      /**
       * 添加内容
       */
       addContent(params){
        return get(base.addContent,params)
       },
       /**
        * 删除内容
        */
        deleteContentByIds(params){
            return get(base.deleteContentByIds,params)
        }
}

export default api