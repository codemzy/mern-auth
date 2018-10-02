const webpack = require('webpack');

module.exports = {
    entry: {
        account: ["babel-polyfill", './apps/account/app.js'],
        login: ["babel-polyfill", './apps/login/app.js']
    },
    output: {
        path: __dirname,
        filename: './public/js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                }
            }
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'cheap-module-eval-source-map'
};