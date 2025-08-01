import baseConfig from '@philian73/eslint-config'
import betterTailwind from 'eslint-plugin-better-tailwindcss'

export default [
  ...baseConfig,
  {
    plugins: {
      'better-tailwindcss': betterTailwind,
    },
    rules: {
      ...betterTailwind.configs['recommended-warn'].rules,
      ...betterTailwind.configs['recommended-error'].rules,
      'better-tailwindcss/sort-classes': 'warn',
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        {
          printWidth: 100,
          lineBreakStyle: 'windows',
          group: 'newLine',
          indent: 3,
        },
      ],
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/app/globals.css',
      },
    },
  },
]
