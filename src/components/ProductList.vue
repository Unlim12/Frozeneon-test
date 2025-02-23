<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import ProductItem from './ProductItem.vue';
import SearchBar from './SearchBar.vue';
import { useProducts } from '@/composables/useProducts';

const { products, fetchProducts, isLoading } = useProducts();
const searchQuery = ref('');
const loadMoreTrigger = ref<HTMLElement | null>(null);
const viewMode = ref<'grid' | 'list'>('grid');

const filteredProducts = computed(() =>
    products.value.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
);

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
</script>

<template>
  <SearchBar @update:search="searchQuery = $event" />

  <!-- Кнопка переключения режима -->
  <button @click="toggleViewMode" class="toggle-view-btn">
    {{ viewMode === 'grid' ? 'Список' : 'Сетка' }}
  </button>

  <div class="product-list">
    <TransitionGroup
        name="fade"
        tag="div"
        :class="['product-container', viewMode]"
    >
      <ProductItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </TransitionGroup>

    <div ref="loadMoreTrigger" class="load-more-trigger">
      <span v-if="isLoading">Загрузка...</span>
    </div>
  </div>
</template>

<style scoped>
.toggle-view-btn {
  display: block;
  margin-left: auto;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

.product-container.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.product-container.list {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.product-container.list .product-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: row-reverse;
  gap: 20px;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.load-more-trigger {
  width: 100%;
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
}
</style>
