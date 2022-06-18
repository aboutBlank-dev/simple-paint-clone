const path = require('path');

module.exports = {
  entry: './src/main.js',
  devServer: {
    port: 3000,
    hot: true,
    static: [
      {
        directory: path.resolve(__dirname, 'dist')
      }
    ]
    
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: "development"
}