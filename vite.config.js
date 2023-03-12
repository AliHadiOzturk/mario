import {defineConfig} from "vite"

export default defineConfig({
    base: "./",
    server: {
        port: 3500
    },
    build: {
        outDir: "build",
    }
})
