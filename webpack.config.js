const path = require("path");

module.exports = {
  entry: [
    "./js/main.js",
    "./js/backend.js",
    "./js/download.js",
    "./js/map.js",
    "./js/form.js",
    "./js/upload.js",
    "./js/pins.js",
    "./js/card.js",
    "./js/move-pin.js",
    "./js/debounce.js",
    "./js/message.js",
    "./js/upload-photo.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false
};
