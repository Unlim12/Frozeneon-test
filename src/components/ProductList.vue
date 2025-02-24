<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import SearchBar from './SearchBar.vue';
import { useProductList } from '@/composables/useProductList';

const {
  products,
  filteredProducts,
  isLoading,
  handleSearch,
  loadMoreTrigger,
  viewMode,
  toggleViewMode,
  localSearchQuery,
  searchQuery
} = useProductList();
</script>


<template>
  <SearchBar
      @update:localSearch="localSearchQuery = $event"
      @update:search="searchQuery = $event; handleSearch()"
  />

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
.product-container.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0 20px;
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
  padding: 0
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

.toggle-view-btn {
  display: block;
  margin-top: 10px;
  margin-inline-start: auto;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
@media (max-width: 1024px) {
  .toggle-view-btn {
    display: none;
  }
  .product-container.grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    flex-direction: row-reverse;
    padding: 0
  }
}
</style>
