import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				'singapore-sling': ['Singapore Sling', 'serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					violet: {
						DEFAULT: 'hsl(var(--accent-violet))',
						foreground: 'hsl(var(--accent-violet-foreground))'
					},
					teal: {
						DEFAULT: 'hsl(var(--accent-teal))',
						foreground: 'hsl(var(--accent-teal-foreground))'
					}
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			boxShadow: {
				'glow': '0 0 40px hsl(var(--primary) / 0.15)',
				'violet-glow': '0 0 40px hsl(var(--accent-violet) / 0.2)',
				'elegant': '0 10px 40px -10px hsl(var(--primary) / 0.2)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				grid: {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(calc(var(--cell-size) * -1))'
					}
				},
				gradient: {
					'0%': {
						'background-size': '200% 200%',
						'background-position': '0% 0%'
					},
					'20%': {
						'background-size': '200% 200%',
						'background-position': '50% 0%'
					},
					'40%': {
						'background-size': '200% 200%',
						'background-position': '100% 0%'
					},
					'60%': {
						'background-size': '200% 200%',
						'background-position': '100% 100%'
					},
					'80%': {
						'background-size': '200% 200%',
						'background-position': '50% 100%'
					},
					'100%': {
						'background-size': '200% 200%',
						'background-position': '0% 0%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'grid': 'grid 20s infinite',
				'gradient': 'gradient 8s infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
