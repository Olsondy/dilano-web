import fs from 'node:fs'
import path from 'node:path'
import { loadEnv } from 'vite'

/**
 * Generate public/app.config.js from environment files
 * Uses Vite's loadEnv to correctly merge .env, .env.local, and .env.[mode]
 */
function generateAppConfig(mode) {
  const root = process.cwd()
  // Load env vars just like Vite does
  // 3rd arg '' means load ALL env vars, not just VITE_ prefixes (though we usually only care about VITE_)
  const env = loadEnv(mode, root, '')

  // Extract ALL VITE_ variables to allow full runtime configuration
  // This matches Vite's own logic: variables starting with VITE_ are meant for the client
  const config = {}
  Object.keys(env).forEach(key => {
    if (key.startsWith('VITE_')) {
      config[key] = env[key]
    }
  })

  const content = `/**
 * Runtime Application Configuration
 * Generated from .env.${mode} during build
 */
window.APP_CONFIG = ${JSON.stringify(config, null, 2)};
Object.freeze(window.APP_CONFIG);`

  const outputPath = path.resolve(root, 'public/app.config.js')
  fs.writeFileSync(outputPath, content)

  console.log(`✅ [Config Generator] Generated public/app.config.js for mode: ${mode}`)
  console.log(`   - Keys exposed: ${Object.keys(config).join(', ')}`)
}

const mode = process.argv[2] || 'prod'
generateAppConfig(mode)
