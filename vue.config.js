module.exports ={
  devServer:{
      proxy:{
          '/api': {
              target: 'http://localhost:8888',//目标路径 真实网址 
              changeOrigin: true,//允许跨域
              pathRewrite:{
                "^/api":''
              }
            },
            
      }
  }
}