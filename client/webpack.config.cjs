const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Entry point for your React app
    output: {
        filename: 'bundle.js', // Output file
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Handle JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel to transpile JS/JSX
                },
            },
            {
                test: /\.css$/, // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Automatically resolve these file extensions
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Provide an HTML template
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'), // Serve files from 'dist'
        compress: true,
        port: 9000, // Port to run the development server on
    },
    mode: 'development', // Use development mode
};
