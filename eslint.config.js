import { defineConfig } from '@soybeanjs/eslint-config'

export default defineConfig(
  {
    vue: true,
    unocss: true,
    prettierRules: {
      semi: false
    },
    ignores: ['public/app.config.js', 'build/config-generator.js']
  },
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]']
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/']
        }
      ],
      'unocss/order-attributify': 'off'
    }
  }
)
