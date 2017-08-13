// tslint:disable:no-console
import * as webpack from "webpack";
import * as WebpackDevServer from "webpack-dev-server";
import * as path from "path";
import config from "../config.dev";

const port = 3000;
const publicPath = "/";

new WebpackDevServer(webpack({
    target: "web",
    devtool: "#source-map",
    context: path.resolve(__dirname, "../"),
    entry: [
        "tslib",
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        path.resolve("src/App")
    ],
    output: {
        path: path.resolve("build"),
        filename: "build.js",
        publicPath
    },
    resolve: {
        extensions: [".css", ".js", ".jsx", ".ts", ".tsx", ".json"],
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
            test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            },
            "config": {
                API: JSON.stringify(config.api),
                THUNDER: JSON.stringify(config.thunder),
                SENTRY: JSON.stringify(config.sentry),
                SCREEN: JSON.stringify(process.env.SCREEN || "primary")
            },
            "__DEV__": true
        })
    ]
}), {
    publicPath,
    contentBase: "./build",
    hot: true,
    stats: {
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
    }
}).listen(port, "0.0.0.0", (err, result) => {
    if (err) {
        console.log(err);
    }

    console.log("Listening at http://localhost:" + port);
});
