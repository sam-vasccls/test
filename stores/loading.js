import { defineStore } from 'pinia';

export const useLoadingStore = defineStore('loading', {
    state: () => ({
        isActive: true
    }),
    getters: {
        $isLoading: (state) => state.isActive
    },
    actions: {
        setLoading(value) {
            this.isActive = value
        }
    },
});
