const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {

    // 벡엔드의 서버 설정
    // 수정하면 서버 재구동 필수
    proxy : {
      // 1.234.5.158:23000/member101/....
      '/member101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      // 1.234.5.158:23000/board101/....
      '/board101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      // 1.234.5.158:23000/item101/...
      '/item101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      '/image': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },

    }

  }
})

