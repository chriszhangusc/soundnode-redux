var path = require('path');
module.exports = {
    "extends": "airbnb",
    "plugins": [
      "react",
      "jsx-a11y",
      "import"
    ],
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {
      "import/no-unresolved": 0,
      "import/no-extraneous-dependencies": 0,
      "comma-dangle": 0
    }
};
