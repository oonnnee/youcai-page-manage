const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: './src/app.jsx',
    output:{
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/dist/",
        filename: 'app.js'
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            style: path.resolve(__dirname, 'src/style'),
            js: path.resolve(__dirname, 'src/js'),
            img: path.resolve(__dirname, 'src/img'),
            lib: path.resolve(__dirname, 'src/lib'),
            layout: path.resolve(__dirname, 'src/page/layout')
        }
    },
    module: {
        rules: [
            // react(jsx)语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // 图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html',
        }),
        // 独立css文件
        new ExtractTextPlugin("style/[name].css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port: 8088
    }
};
