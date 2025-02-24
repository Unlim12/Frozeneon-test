import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useProducts } from '@/composables/useProducts';

export function useProductList() {
    const { products, fetchProducts, searchProducts, isLoading, isSearching } = useProducts();

    const loadMoreTrigger = ref<HTMLElement | null>(null);
    const viewMode = ref<'grid' | 'list'>('grid');
    const localSearchQuery = ref('');
    const searchQuery = ref('');

    const filteredProducts = computed(() => {
        if (isSearching.value) return products.value;
        if (!localSearchQuery.value.trim()) return products.value;

        return products.value.filter(product =>
            product.title.toLowerCase().includes(localSearchQuery.value.toLowerCase())
        );
    });

    const handleSearch = () => {
        if (searchQuery.value.trim()) {
            searchProducts(searchQuery.value);
        } else {
            fetchProducts(false);
        }
    };

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && !isLoading.value) {
                fetchProducts();
            }
        },
        { rootMargin: '100px' }
    );

    onMounted(() => {
        if (loadMoreTrigger.value) observer.observe(loadMoreTrigger.value);
    });

    onUnmounted(() => {
        if (loadMoreTrigger.value) observer.unobserve(loadMoreTrigger.value);
    });

    const toggleViewMode = () => {
        viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid';
    };

    return {
        products,
        filteredProducts,
        isLoading,
        isSearching,
        fetchProducts,
        searchProducts,
        handleSearch,
        loadMoreTrigger,
        observer,
        viewMode,
        toggleViewMode,
        localSearchQuery,
        searchQuery
    };
}
