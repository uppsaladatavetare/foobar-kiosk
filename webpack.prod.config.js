const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

const config = require(process.env.SETTINGS || "./config");

module.exports = {
    entry: [
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
        preLoaders: [{
            test: /(\.tsx?)$/,
            loader: "tslint",
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript",
            exclude: /node_modules/
        }, {
            test: /(\.scss|\.css)$/,
            loaders: [
                "style",
                "css?sourceMap&modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
                "typed-css-modules?rootDir=src&searchDir=styles",
                "postcss",
                "sass"
            ]
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
                NODE_ENV: JSON.stringify("production"),
                API: JSON.stringify(config.api)
            }
        })
    ]
};
