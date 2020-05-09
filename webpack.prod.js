const webpack = require('webpack');

module.exports = {
    mode: 'production',
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
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL),
                MAPBOX_TOKEN: JSON.stringify(process.env.MAPBOX_TOKEN)
            }
        })
    ],
};