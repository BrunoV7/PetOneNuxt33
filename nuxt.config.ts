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
    prefix: '',
    componentDir: './components/ui',
  },

  experimental: {
    // reactivityTransform: true,
  },

  // Configuração de servidor
  devServer: {
    port: 443,  // Porta 443 para HTTPS
    host: '0.0.0.0',  // Isso permite acesso de fora do container
    https: process.env.NODE_ENV === 'production' ? {
      key: fs.readFileSync('/etc/ssl/private/server.key', 'utf8'),
      cert: fs.readFileSync('/etc/ssl/certs/server.crt', 'utf8')
    } : false  // Não usa HTTPS em desenvolvimento
  },
})
