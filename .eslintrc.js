var path = require('path');
module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "rules": {
      "import/no-unresolved": 0,
      "import/no-extraneous-dependencies": 0
    }
    // 'import/resolver': {
    //   webpack: {
    //     config: path.join(__dirname, 'webpack.config.js')
    //   }
    // }
};
