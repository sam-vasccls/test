import { defineNuxtRouteMiddleware } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
    if(process.client){
        const theme = localStorage.getItem('theme')
        if(theme){
            document.documentElement.setAttribute("data-theme", theme);
        }
    }
})