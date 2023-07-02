const path = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js', // Replace with the path to your application's entry point
    output: {
        path: path.resolve(__dirname, '../backend/public/static/js'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};