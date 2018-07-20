module.exports = {
 proxy: {
    '/api': {  //将www.exaple.com印射为/api
      target: 'http://192.168.3.40:8081', // 接口域名
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/api': ''  //需要rewrite的,
      }
    }
 }
}
