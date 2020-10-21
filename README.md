# Webpack Basic

```
$ node_modules/.bin/webpack

$ node_modules/.bin/webpack --mode=production

$ npm run build
```

## Write modular code

webpack.config.js

```js
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "../build/application.js",
    },
};
```

```js
module.exports = {
    output: {
        filename: "application.js",
        path: "/home/$USER/path/to/yourbuild/folder"
    }
}
```

```sh
$ npm install path --save-dev
```

watch

```js
const path = require("path");

module.exports = {
    watch: true,
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
    },
};
```

## Loaders and Plugins

```
$ $ npm install --save-dev babel-loader @babel/core @babel/preset-env
```

```js
const path = require("path");

module.exports = {
    watch: true,
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
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
        }, ],
    },
};
```

handling CSS and SASS Files

importing CSS in javascript

Loading CSS with CSS-Loader

```sh
$ npm install css-loader --save-dev
```

```
$ npm install style-loader --save-dev
```

```js
const path = require("path");

module.exports = {
    watch: true,
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
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
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};
```

Compiling SASS to CSS

```
$ npm install sass-loader node-sass --save-dev
```

Prefixing CSS with Vendor Prefixes

```
background: -webkit-gradient(linear, left top, right top, from(#00467f),
to(#a5cc82));
background: -o-linear-gradient(left, #00467f, #a5cc82);
background: linear-gradient(to right, #00467f, #a5cc82)
```

```
$ npm install postcss-loader --save-dev
```

```
$ npm install autoprefixer --save-dev
```

```js
const path = require("path");

module.exports = {
    watch: true,
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
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
                    "style-loader",
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
                    "style-loader",
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
        ],
    },
};
```

```
$ npm install --save-dev mini-css-extract-plugin
```

```js
const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");

module.exports = {
    watch: true,
    mode: "production",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new MiniCssExtracPlugin({
            filename: "application.css",
        }),
    ],
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
        ],
    },
};
```

Minifying the Extracted CSS

```sh
$ npm install optimize-css-assets-webpack-plugin --save-dev
```

Handling Images

Loading Image Files

```css
body {
    background-image: url('cat.jpg');
    background-size: cover; 
}
```

```
$ npm install url-loader --save-dev
```

```
$ npm install file-loader --save-dev
```

```js
const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = {
    watch: true,
    mode: "production",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "application.js",
        path: path.resolve(__dirname, "build"),
    },
    plugins: [
        new MiniCssExtracPlugin({
            filename: "application.css",
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
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                    },
                }, ],
            },
        ],
    },
};
```

```
$ npm install image-webpack-loader --save-dev
```

## Cache

Output Files Naming

Adding Hash Content

```js
const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

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
```

Cleaning the Build Directory

```sh
$ npm install --save-dev clean-webpack-plugin
```

Manifest Plugin

```
$ npm install --save-dev webpack-manifest-plugin
```

Alternative to Manifest

```sh
$ npm install --save-dev html-webpack-plugin
```

## Resolving Folders

Organizing Our Files

Aliases

Resolving Modules

## Webpack DevServer

Installing and Configuring Webpack Dev Server

Understanding publicPath option

```js
const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {
        port: 9000,
        contentBase: path.resolve(__dirname, "build"),
        // publicPath: "/assets/", use for not index.html
    },
    watch: true,
    mode: "production",
    devtool: "cheap-module-eval-source-map",
    entry: {
        application: "./src/javascript/index.js",
        admin: "./src/javascript/admin.js",
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
```

Hot Module Replacement

## CP-7 : Installing Third-Party Libraries

```js
const path = require("path");
const MiniCssExtracPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const mode = "development";

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
```

```json
{
    "name": "webpack_03",
    "version": "1.0.0",
    "description": "",
    "main": "dist/jquery.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack",
        "start": "webpack-dev-server"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/core": "^7.10.4",
        "@babel/preset-env": "^7.10.4",
        "autoprefixer": "^9.8.4",
        "babel-loader": "^8.1.0",
        "clean-webpack-plugin": "^3.0.0",
        "css-loader": "^3.6.0",
        "file-loader": "^6.0.0",
        "html-webpack-plugin": "^4.3.0",
        "image-webpack-loader": "^6.0.0",
        "mini-css-extract-plugin": "^0.9.0",
        "node-sass": "^4.14.1",
        "optimize-css-assets-webpack-plugin": "^5.0.3",
        "path": "^0.12.7",
        "postcss-loader": "^3.0.0",
        "sass-loader": "^9.0.2",
        "style-loader": "^1.2.1",
        "url-loader": "^4.1.0",
        "webpack": "^4.43.0",
        "webpack-cli": "^3.3.12",
        "webpack-dev-server": "^3.11.0",
        "webpack-manifest-plugin": "^2.2.0"
    },
    "dependencies": {
        "bootstrap": "^4.5.0",
        "jquery": "^3.5.1"
    }
}
```

### Using Bootstrap with Webpack

```
$ npm install bootstrap
$ npm install popper.js
```

> src/javascript/index.js

```js
import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { sayHello } from "./greeting.js";
import { sayHello1 } from "./greeting1.js";
import application from "CssFolder/application.scss";

sayHello();
sayHello1();

$("body").append(
    '<div style="background:green;padding:10px;">Hello jQuery MM</div>'
);

$("[data-toggle='tooltip']").tooltip();

if (module.hot) {
    module.hot.accept(function(err) {
        console.log(err);
    });
}
```

> template.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8" />
    <title>My custom template</title>
</head>

<body>
    <p style="background: white">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim a d minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliq uip ex ea commodo consequat. Duis aute irure
        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia dese runt mollit anim id est laborum.
    </p>
    <a href="#" class="btn btn-primary">Button</a>
    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
      Tooltip on Top
    </button>
</body>

</html>
```

### Webpack ProvidePlugin

> webpack.config.js

```js
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
```

> application.scss

```scss
@import '~bootstrap/dist/css/bootstrap.css';

/*
@import './another_css_file1.css';
@import './another_css_file2.css';
*/
```

### Installing jQuery-UI

```sh
$ npm install jquery-ui
```

```js
//...
import $ from "jquery";
import "bootstrap";
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/droppable';
```

> index.js

```js
import $ from "jquery";
import "bootstrap";
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
// import "bootstrap/dist/css/bootstrap.css";
import { sayHello } from "./greeting.js";
import { sayHello1 } from "./greeting1.js";
import application from "CssFolder/application.scss";

sayHello();
sayHello1();

$("body").append(
    '<div style="background:green;padding:10px;">Hello jQuery MM</div>'
);

$("[data-toggle='tooltip']").tooltip();

$("#datepicker").datepicker();

if (module.hot) {
    module.hot.accept(function(err) {
        console.log(err);
    });
}
```

### Installing QuillJS

```sh
$ npm install quill
```

> index.js

```js
import $ from "jquery";
import "bootstrap";
import "jquery-ui";
import "jquery-ui/ui/widgets/datepicker";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import Quill from "quill";
// import "bootstrap/dist/css/bootstrap.css";
import { sayHello } from "./greeting.js";
import { sayHello1 } from "./greeting1.js";
import application from "CssFolder/application.scss";

sayHello();
sayHello1();

$("body").append(
    '<div style="background:green;padding:10px;">Hello jQuery MM</div>'
);

$("[data-toggle='tooltip']").tooltip();

$("#datepicker").datepicker();

var quill = new Quill("#editor", {
    theme: "snow",
});

if (module.hot) {
    module.hot.accept(function(err) {
        console.log(err);
    });
}
```

> application.scss

```scss
@import '~bootstrap/dist/css/bootstrap.css';
@import '~jquery-ui/themes/base/datepicker.css';
@import '~jquery-ui/themes/base/theme.css';
@import '~quill/dist/quill.snow.css';

/*
@import './another_css_file1.css';
@import './another_css_file2.css';
*/

$gradient: linear-gradient(to right, #00467f, #a5cc82);
body {
    // background-image: $gradient;
    // background: -webkit-gradient(linear, left top, right top, from(#00467f), to(#a5cc82));
    // background: -o-linear-gradient(left, #00467f, #a5cc82);
    // background: linear-gradient(to right, #00467f, #a5cc82);
    background-image: url("../images/cat2.png");
    background-size: cover;
}
```

> template.html

```html
    <div style="background: #fff; margin: 20px">
        <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p><br /></p>
        </div>
    </div>
```

### Installing CKEDITOR

```sh
$ npm install @ckeditor/ckeditor5-build-classic
```

>> index.js

```js
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
ClassicEditor.create(document.querySelector("#ckeditor"))
    .then((editor) => {
        console.log(editor);
    })
    .catch((error) => {
        console.error(error);
    });
```

> template.html

```html
<textarea id="ckeditor">Some initial text...</textarea>
```

### Lazy Loading
