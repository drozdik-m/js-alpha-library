const path = require('path');
const webpack = require('webpack');

module.exports = [
    //STANDALONE
    {
        //Entry points
        entry: {
            StandaloneGoogleAnalytics: "./dist/demo/standalone/google-analytics.js"
        },

        //Output
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "./dist/pack")
        },

        //Mode
        mode: "production"
    }
];