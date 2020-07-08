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