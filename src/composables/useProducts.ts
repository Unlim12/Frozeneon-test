import { ref, onMounted } from 'vue';
import type { Product } from '@/types/types';

export function useProducts() {
    const products = ref<Product[]>([]);
    const limit = 20;
    let offset = 0; // Сколько товаров уже загружено
    const isLoading = ref(false); // Флаг загрузки

    async function fetchProducts(reset = false) {
        try {
            isLoading.value = true;

            const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
            const data = await res.json();

            products.value = [...products.value, ...data.products];
            offset += limit;

        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        } finally {
            isLoading.value = false;
        }
    }

    onMounted(() => fetchProducts());

    return { products, fetchProducts, isLoading };
}
