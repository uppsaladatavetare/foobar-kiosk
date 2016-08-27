var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config");

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    contentBase: "./build",
    inline: true,
    hot: true,
    historyApiFallback: true,
    stats: {
        hideModules: true,
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
}).listen(3000, "0.0.0.0", function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log("Listening at http://localhost:3000");
});
