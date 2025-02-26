import globals from "globals"
import stylisticJs from '@stylistic/eslint-plugin-js'
import js from '@eslint/js'


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
	  ignores: ["dist/"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
	  languageOptions: {
        sourceType: "commonjs",
        globals: {
          ...globals.node,
        },
        ecmaVersion: "latest",
      },
	  plugins: {
        '@stylistic/js': stylisticJs
	  },
	  rules: {
        '@stylistic/js/indent': [
          'error',
          'tab'
        ],
        '@stylistic/js/linebreak-style': [
          'error',
          'unix'
		],
        '@stylistic/js/quotes': [
          'error',
          'single'
		],
        '@stylistic/js/semi': [
          'error',
          'never'
		],
		'eqeqeq': 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': [
          'error', 'always'
		],
		'arrow-spacing': [
          'error', { 'before': true, 'after': true },
		],
		'no-console': 'off',
	  },
  },
]
