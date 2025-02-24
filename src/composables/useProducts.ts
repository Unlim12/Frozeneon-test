import { ref, onMounted } from 'vue';
import type { Product } from '@/types/types';

interface ApiResponse {
    products: Product[];
}

export function useProducts() {
    const products = ref<Product[]>([]);
    const limit = 20;
    let offset: number = 0;
    const isLoading = ref(false);

    async function fetchProducts(reset = false) {
        try {
            isLoading.value = true;

            const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${offset}`);
            const data: ApiResponse = await res.json();


            if (reset) {
                products.value = data.products;
            } else {
                products.value = [...products.value, ...data.products];
            }
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