const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // mediaはos依存に自動でなるため手動で変えられうようにclassへ
	theme: {
		extend: {
			fontFamily: {
				serif: ['var(--heading-font)', ...fontFamily.serif],
				sans: ['var(--body-font)', ...fontFamily.sans]
			},
			colors: {
				white: 'var(--white)',
				black: 'var(--black)',
				pink: 'var(--pink)',
				yellow: 'var(--yellow)',
				blue: 'var(--blue)',
				'ui-bg': 'var(--ui-bg)',
				'kmsn-bg': 'var(--kmsn-bg)'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
