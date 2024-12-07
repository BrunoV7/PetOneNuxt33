// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],

  shadcn: {
    /**
     * Prefix for all the imported components
     */
    prefix: '',
    /**
     * Directory where the components live.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  experimental: {
    // reactivityTransform: true, // Habilita macros reativas do Vue
  },

  // Configuração de servidor
  devServer: {
    port: 443,  // Altere para 443 para rodar em HTTPS
    host: '0.0.0.0',  // Isso permite que o Nuxt seja acessado de fora do container
    https: {
      key: fs.readFileSync('/etc/ssl/private/server.key', 'utf8'),  // Caminho para sua chave privada
      cert: fs.readFileSync('/etc/ssl/certs/server.crt', 'utf8')  // Caminho para o certificado SSL
    }
  },
})
