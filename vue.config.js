module.exports = {
  baseUrl: '/', //根路径
  outputDir: 'dist', //构建输出目录
  assetsDir: 'assets', //静态资源目录(css,js,imgage,font)
  lintOnSave: false, //是否开启es lint保存检测
  devServer: {
    open: true, //运行完自动在浏览器打开
    host: 'localhost',
    port: 8888, //端口号
    https: false,
    hotOnly: false, //热更新(webpack已经配的有)
    // proxy: {
    //     //配置跨域
    //     'api': {
    //         target: 'http://www.demo.com',
    //         ws: true,
    //         changeOrigin: true,
    //         pathRewrite: {
    //             '^/api': ''
    //         }
    //     }
    // }
  }
}