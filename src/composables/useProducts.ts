import { ref, onMounted } from 'vue';
import type { Product } from '@/types/types';

export function useProducts() {
    const products = ref<Product[]>([]);
    const isLoading = ref(false);
    const isSearching = ref(false);
    let offset = 0;
    const limit = 20;
    let lastQuery = '';

    async function fetchProducts(append = true) {
        if (isSearching.value) return; // Если идёт API-поиск, не подгружаем

        try {
            if (!append) {
                offset = 0;
                products.value = [];
            }
            isLoading.value = true;
            const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
            const data = await res.json();

            products.value = append ? [...products.value, ...data.products] : data.products;
            offset += limit;
        } catch (error) {
            console.error('Ошибка загрузки товаров:', error);
        } finally {
            isLoading.value = false;
        }
    }

    async function searchProducts(query: string) {
        if (!query.trim()) {
            console.log("Пустой запрос, возвращаемся к стандартному списку");
            isSearching.value = false;
            lastQuery = '';
            return;
        }

        try {
            isSearching.value = true;
            isLoading.value = true;
            lastQuery = query;
            console.log("Отправляем запрос к API:", query);
            const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            console.log("Ответ API:", data);
            products.value = data.products;
        } catch (error) {
            console.error('Ошибка поиска:', error);
        } finally {
            isLoading.value = false;
        }
    }
    onMounted(() => fetchProducts());

    return { products, fetchProducts, searchProducts, isLoading, isSearching };
}
