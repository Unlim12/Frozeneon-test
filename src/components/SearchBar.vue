<template>
  <div class="search-bar">
    <input
        v-model="localQuery"
        type="text"
        placeholder="Фильтровать товары в ленте..."
        class="search-input"
        @input="emit('update:localSearch', localQuery)"
    />

    <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск в магазине(поиск по API)..."
        class="search-input"
        @input="emitSearch"
        @keyup.enter="emitSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const localQuery = ref('');
const searchQuery = ref('');
const emit = defineEmits(['update:localSearch', 'update:search']);
const emitSearch = () => {
  console.log("Кнопка поиска нажата, отправляем событие:", searchQuery.value);
  emit('update:search', searchQuery.value);
};
</script>
<style scoped>
.search-input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  margin: 10px auto 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>
