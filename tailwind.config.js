/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			spacing: {
				360: '360px',
			},
			maxWidth: {
				1945: '1945px',
			},
			screens: {
				'3xl': '1945px',
			},
		},
	},
	plugins: [],
};
