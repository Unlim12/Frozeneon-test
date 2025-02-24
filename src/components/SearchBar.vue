<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
defineEmits(['update:search']);

</script>

<template>
  <div>
    <input
        v-model="searchQuery"
        @input="$emit('update:search', searchQuery)"
        type="text"
        placeholder="Поиск товаров..."
        class="search-input"
    />
  </div>
</template>

<style scoped>
.search-input {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  margin: 10px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>

