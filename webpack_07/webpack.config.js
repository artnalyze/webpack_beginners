const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = "development";
const webpack = require("webpack");

module.exports = {
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, "build"),
        // publicPath: "/assets/",
        hot: true,
        overlay: true,
    },
    watch: true,
    // mode: "production",
    mode: mode,
    devtool: "cheap-module-eval-source-map",
    entry: {
        application: "./src/javascript/index.js",
        admin: "./src/javascript/admin.js",
    },
    output: {
        filename: mode === "production" ? "[name]-[contenthash].js" : "[name].js",
        // [hash] : is generated every change same to all bundle file
        // [chunkhash] : is application and admin will split hash file
        // [contenthash] : is generated each file separately
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
        new HtmlWebpackPlugin({
            template: "./src/template.html",
        }),
        new WebpackManifestPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtracPlugin({
            filename: mode === "production" ? "[name]-[contenthash].css" : "[name].css",
        }),
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    resolve: {
        alias: {
            CssFolder: path.resolve(__dirname, "src/stylesheets/"),
        },
        modules: [path.resolve(__dirname, "src/downloaded_libs"), "node_modules"],
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
                            // hmr: true,
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
                        options: {
                            importLoaders: 1,
                            // hmr: true,
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
                    "sass-loader",
                ],
            },
            {
                test: /(png|jpg|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)?$/i,
                use: [{
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: mode === "production" ?
                                "[name].[hash:7].[ext]" :
                                "[name].[ext]",
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