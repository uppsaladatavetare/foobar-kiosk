const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const config = require(process.env.SETTINGS || "./configs/live.js");

module.exports = {
    entry: [
        "tslib",
        path.resolve("src/App")
    ],
    output: {
        path: path.resolve("build"),
        filename: "build.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ["", ".css", ".scss", ".js", ".jsx", ".ts", ".tsx", ".json"],
        modulesDirectories: [
            path.resolve("node_modules"),
            path.resolve("src")
        ]
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript",
            exclude: /node_modules/
        }, {
            test: /(\.scss|\.css)$/,
            loaders: [
                "style",
                "typings-for-css-modules?modules&importLoaders=1&" +
                    "localIdentName=[name]_[local]_[hash:base64:5]&sass&namedExport&camelCase",
                "postcss",
                "sass"
            ]
        }, {
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
            loader: "file"
        }]
    },
    postcss: [
        autoprefixer({
            browsers: ["last 2 versions"]
        })
    ],
    sassLoader: {
        includePaths: [
            path.resolve("node_modules"),
            path.resolve("src")
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            },
            "config": {
                API: JSON.stringify(config.api),
                THUNDER: JSON.stringify(config.thunder),
                SENTRY: JSON.stringify(config.sentry),
                SCREEN: JSON.stringify(process.env.SCREEN || "primary")
            },
            "__DEV__": false
        })
    ]
};
