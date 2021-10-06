const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;
const path = require("path");

module.exports = env => ({
    target:"web",
    output:{
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            }
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remoteApp1",
            library: {type: "var", name: "remoteApp1"},
            filename: "remoteEntry.js",
            exposes: {
                './MfeComponent': {
                    import :'./src/components/Mfe',
                    name: `remote-app-1`
                }
            },
            shared: {
                'react': {
                    requiredVersion: `${dependencies['react']}`
                },
                'react-dom': {
                    requiredVersion: `${dependencies['react-dom']}`
                },
                'react-router-dom': {
                    requiredVersion: dependencies['react-router-dom']
                },
                '@chenlevin89/awesome-lib': {
                    requiredVersion: dependencies['@chenlevin89/awesome-lib']
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
        }),
    ],
    devServer: {
        port: 5200,
        historyApiFallback: true
    }
})