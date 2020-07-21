# css-loader-nano
Minimize CSS output of [css-loader](https://github.com/webpack-contrib/css-loader) using [cssnano](https://github.com/cssnano/cssnano).

## Usage
Install `css-loader-nano`:

```sh
npm install --save-dev css-loader css-loader-nano
```

**webpack.config.js**

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader-nano', // minimize 'css-loader' output
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
};
```
