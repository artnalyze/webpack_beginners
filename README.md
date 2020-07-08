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