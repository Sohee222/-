const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {

    // CMD> npm install   <= node_modules복원(필요시에 수행)
    //CMD> npm run serve  <= 서버구동 
    
    //벡엔드의 서버 설정
    // 수정하면 서버 재구동 필수
    // const url = 'http://1.234.5.158:23000/member101/select.json'
    // const url = '/member101/select.json';
    proxy : {
      '/member101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      // 1.234.5.158:23000/board101/.....
      '/board101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      },
      // 1.234.5.158:23000/item101/.....
      '/item101': {
        target : 'http://1.234.5.158:23000',
        changeOrigin : true,
        logLevel : 'debug'
      }
    }

  }
})

