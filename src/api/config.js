/**
 * 基础的接口地址
 */
const base={
    baseUrl:'http://localhost:8888',//基础地址
    login:'/api/login',//登录接口
    projectList:'/api/projectList',//商品列表接口
    search:'/api/search',//弹框
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',
    register:'/api/register',//注册
    upload:'/upload',//图片
    insertTbItem:'/api/backend/item/insertTbItem',//添加
    deleteGoods:"/api/backend/item/deleteItemById",//删除
    batchDelete:'/api/batchDelete',//批量删除
    updateTbItem:"/api/backend/item/updateTbItem",//修改商品
    getParams:"/api/backend/itemParam/selectItemParamAll",//规格参数列表
    itemParam:"/api/backend/itemParam/insertItemParam",//添加规格列表
    paramsDelete:'/api/params/delete',//规格列表删除
    paramsSearch:"/api/params/search",//规格查询
    paramsCategory:"/api/update/category",//规格编辑
    categoryData:"/api/category/data",//规格参数类目结构数据获取
    getAdvertlist:"/api/content/selectContentCategoryByParentId",//广告内容
    addvertChild:'/api/content/insertContentCategory',//添加广告
    addAdvertContent:"/api/content/selectTbContentAllByCategoryId",//显示广告
    updateContent:"/api/content/updateContentCategory",//修改子广告
    deleteContent: "/api/content/deleteContentCategoryById",//删除子广告
    addContent:'/api/content/insertTbContent',//添加内容
    deleteContentByIds:"/api/content/deleteContentByIds"
}

export default  base