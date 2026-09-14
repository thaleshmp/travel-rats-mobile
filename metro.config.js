const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind  } = require('nativewind/metro')

var config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' })