const webpack = require('webpack');

// change to development or production
process.env.NODE_ENV = 'development';

module.exports = {
    entry: {
        login: './app/login/app.js',
        app: './app/app/app.js',
        common: [
            'script-loader!jquery/dist/jquery.min.js',
            'script-loader!bootstrap/dist/js/bootstrap.min.js'
            ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],
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