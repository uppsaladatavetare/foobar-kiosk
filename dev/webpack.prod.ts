// tslint:disable:no-console
import * as webpack from "webpack";
import * as path from "path";
import config from "../config.prod";

const publicPath = "/";

webpack({
    target: "web",
    devtool: "#source-map",
    context: path.resolve(__dirname, "../"),
    entry: [
        "tslib",
        path.resolve("src/App")
    ],
    output: {
        path: path.resolve("build"),
        filename: "build.js",
        publicPath
    },
    resolve: {
        extensions: [".css", ".scss", ".js", ".jsx", ".ts", ".tsx", ".json"],
        modules: [
            path.resolve("node_modules"),
            path.resolve("src")
        ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                "style-loader",
                {
                    loader: "typings-for-css-modules-loader",
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: "[name]_[local]_[hash:base64:5]",
                        sass: true,
                        namedExport: true,
                        camelCase: true
                    }
                },
                "postcss-loader",
                {
                    loader: "sass-loader",
                    options: {
                        includePaths: [
                            path.resolve("node_modules"),
                            path.resolve("src")
                        ]
                    }
                }
            ]
        }, {
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
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
}).run((err, stats) => {
    if (err) {
        console.log(err);
    }
    console.log(stats.toString({
        colors: true,
        hash: false,
        version: false,
        timings: true,
        assets: true,
        chunks: false,
        modules: false,
        reasons: false,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: false
    }));
});
