const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    plugins: [
        new Dotenv({
            path: './.env'
        })
    ],
    devServer: {
      port: 3000,
      historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};