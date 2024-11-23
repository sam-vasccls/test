import { defineStore } from 'pinia';
import { useLoadingStore } from '@/stores/loading';

export const useWrittenTextStore = defineStore('data', {
    state: () => ({
        writtenText: []
    }),
    getters: {
        $getText: (state) => state.writtenText,
    },
    actions: {
        saveToLocalStorage(text){
            const loadingStore = useLoadingStore()
            loadingStore.setLoading(true)
            localStorage.setItem('text', JSON.stringify(text))
            this.writtenText = text
            loadingStore.setLoading(false)
        },
        loadFromLocalStorage(){
            const loadingStore = useLoadingStore()
            loadingStore.setLoading(true)
            if(this.writtenText.length > 0) {
                loadingStore.setLoading(false)
                return this.writtenText
            }
            const savedText = JSON.parse(localStorage.getItem('text'))
            this.writtenText = savedText
            loadingStore.setLoading(false)
            return savedText
        }
    },
});
