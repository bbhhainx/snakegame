const path = require('path');

module.exports = {
  entry: './src/index.ts', // Điểm vào của ứng dụng TypeScript
  output: {
    filename: 'bundle.js', // File đầu ra
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Sử dụng ts-loader để compile TypeScript
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'web', // Đảm bảo build cho trình duyệt
};