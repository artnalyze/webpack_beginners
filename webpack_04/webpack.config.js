const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    watch: true,
    mode: "production",
    devtool: "cheap-module-eval-source-map",
    entry: {
        application: "./src/index.js",
        admin: "./src/admin.js",
    },
    output: {
        filename: "[name]-[contenthash].js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtracPlugin({
            filename: "[name]-[contenthash].css",
        }),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [{
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtracPlugin.loader,
                    //"style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: ["last 3 versions", "ie >9"],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtracPlugin.loader,
                    //"style-loader",
                    {
                        loader: "css-loader",
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    overrideBrowserslist: ["last 3 versions", "ie >9"],
                                }),
                            ],
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /(png|jpg|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/i,
                use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "[name].[hash:7].[ext]",
                        },
                    },
                    {
                        loader: "image-webpack-loader",
                    },
                ],
            },
        ],
    },
};