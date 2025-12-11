import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174,
        proxy: {
            '/api/courses': {
                target: 'http://localhost:8081',
                changeOrigin: true,
            },
            '/api/teachers': {
                target: 'http://localhost:8082',
                changeOrigin: true,
            },
            '/api/enrollments': {
                target: 'http://localhost:8083',
                changeOrigin: true,
            },
            '/api/students': {
                target: 'http://localhost:8084',
                changeOrigin: true,
            },
            '/api/certificates': {
                target: 'http://localhost:8086',
                changeOrigin: true,
            },
        },
    },
})
