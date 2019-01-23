var path = require('path')
var webpack = require('webpack')
var modulesDir = path.join(__dirname, '..', 'node_modules')

module.exports = {
  entry: path.join(__dirname, 'main.js'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devServer:{
    inline: true,
    port: 3333,
    contentBase: __dirname
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue-tag-editor': path.join(__dirname, '..', 'src/main'),
      'vue$': path.join(modulesDir, 'vue/dist/vue.common.js')
    },
    modules: [
      modulesDir
    ]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: 'sourcemaps/[file].map'
    })
  ]
}