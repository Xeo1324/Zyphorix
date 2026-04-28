import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zyphorix - Your Project Vault',
    short_name: 'Zyphorix',
    description: 'Premium digital storage warehouse for your projects',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f0f0f',
    theme_color: '#00d4ff',
    scope: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
  }
}
