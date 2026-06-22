import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_FIREBASE_API_KEY': JSON.stringify('AIzaSyB3cH9ihq7o5kaREOhj9g_jIp7ocHU9wXg'),
    'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify('manoj-roshini-wedding.firebaseapp.com'),
    'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify('manoj-roshini-wedding'),
    'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify('manoj-roshini-wedding.firebasestorage.app'),
    'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify('54480990451'),
    'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify('1:54480990451:web:26653c3f2c14dffdca4786'),
    'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify('service_k0j0st9'),
    'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify('template_1380lda'),
    'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify('o4zupMKozfgmvWO8H'),
  }
})