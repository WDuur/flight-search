/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
			'plugin:vue/vue3-essential',
			'@vue/eslint-config-typescript',
			'@vue/eslint-config-prettier',
			'eslint:recommended', 
			'plugin:prettier/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error"
    }
}
