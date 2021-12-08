module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:vue/essential",
  ],
  "env": {
    "browser": "true",
    "node": "true"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    'vue/multi-word-component-names': 'off',
    "no-unused-vars": "warn",
    "indent": ["warn", 2],
    "quotes": ["warn", "single"],
    "padded-blocks": ["warn", "never"],
    "quote-props": ["warn", "as-needed"],
    "dot-location": ["warn", "object"],
    "dot-location": ["warn", "property"],
    "sort-keys": "off",
    "semi": [2, "always"],
    "max-len": ["warn", { "code": 80 }],
    "no-console": "warn"
  },
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  }
};