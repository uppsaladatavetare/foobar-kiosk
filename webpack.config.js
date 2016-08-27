const path = require("path");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ForkCheckerPlugin = require("awesome-typescript-loader").ForkCheckerPlugin;

const config = require(process.env.SETTINGS || "./config");

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
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
            loaders: ["react-hot", "awesome-typescript"],
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
        new webpack.HotModuleReplacementPlugin(),
        new ForkCheckerPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                API: JSON.stringify(config.api)
            }
        })
    ],
    devtool: "eval"
};
