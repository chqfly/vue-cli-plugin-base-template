module.exports = {
  publicPath: "/",
  css: {
    loaderOptions: {
      scss: {
        // 引入全局scss变量和mixins
        prependData: `
          @import "~@/styles/variables.scss";
          @import "~@/styles/mixins.scss";
        `
      }
    }
  }
};
