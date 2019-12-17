const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = {
    entry: {
        main: './src/index.ts'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader'
            ]
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'main.js'
    }, plugins: [
        new MiniCssExtractPlugin({
            filename: 'style/[name].css',  // 打包后从js文件中提取出来的css文件名称
        }),
    ]
}

module.exports = config;
