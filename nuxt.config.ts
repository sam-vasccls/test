// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/scss/main.scss"],
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-icon", "@nuxt/icon"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/variables.scss";',
                },
            },
        },
    },
});
