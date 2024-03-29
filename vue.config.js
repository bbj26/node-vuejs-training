module.exports = {
  devServer: {
    port: 4100,
    proxy: {
      '/api': {
        target: 'http://localhost:4101',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '/api': '/' }
      }
    }
  },
  pages: {
    index: {
      // entry for the page
      entry: 'client/src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // eslint-disable-next-line max-len
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
};

