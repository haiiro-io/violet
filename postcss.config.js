const path = require('path');

module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-import': {
      resolve (id, baseDir) {
        return (/^~/.test(id)) ? path.resolve(__dirname, id.replace("~", ".")) : path.resolve(baseDir, id);
      }
    },
    'postcss-preset-env': {
      stage: 0,
      importFrom: [
        () => {
          return {
            customProperties: {
              '--skyhai': '#DFE0E0',
              '--soba': '#D8D8D8',
              '--konezumi': '#555555',
              '--nibihai': '#999999'
            }
          };
        }
      ]
    }
  }
})
