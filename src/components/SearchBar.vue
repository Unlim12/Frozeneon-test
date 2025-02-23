<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
defineEmits(['update:search']); // Объявляем событие, которое будем отправлять

</script>

<template>
  <div class="relative flex flex-col items-center min-h-screen bg-gradient-to-b from-teal-400 to-teal-600">
    <input
        v-model="searchQuery"
        @input="$emit('update:search', searchQuery)"
        type="text"
        placeholder="Поиск товаров..."
        class="w-96 p-3 text-lg rounded-lg border-none outline-none shadow-lg focus:ring-2 focus:ring-white"
    />
  </div>
</template>

<style scoped>
.w-96 {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fff;
  margin: 10px auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>

