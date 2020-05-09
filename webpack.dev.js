const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: './.env'
        })
    ],
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