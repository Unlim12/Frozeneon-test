<template>
  <div v-if="product" class="product-card">
    <img :src="product.thumbnail" :alt="product.title" class="product-image">

    <h3 class="product-title">{{ product.title }}</h3>
    <p class="product-description">{{ product.description }}</p>

    <div class="product-meta">
      <span class="meta-item"><strong>Бренд:</strong> {{ product.brand }}</span>
      <span class="meta-item"><strong>Категория:</strong> {{ product.category }}</span>
    </div>

    <div class="product-price">
      <span class="price"><strong>Цена:</strong> ${{ product.price }}</span>
      <span class="discount">Скидка: {{ product.discountPercentage }}%</span>
    </div>

    <div class="product-rating">
      <span>⭐ {{ product.rating }}</span>
    </div>

    <div class="product-stock">
      <span><strong>Наличие:</strong> {{ product.availabilityStatus }}</span>
    </div>

    <div class="product-warranty">
      <span><strong>Гарантия:</strong> {{ product.warrantyInformation }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/types/types';

defineProps<{ product: Product }>();
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
  margin: 20px auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.product-image {
  display: block;
  height: 240px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.product-title {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-description {
  font-size: 0.95em;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.product-meta,
.product-price,
.product-stock,
.product-warranty {
  margin-bottom: 12px;
}

.meta-item {
  display: block;
  font-size: 0.9em;
  color: #777;
}

.product-price {
  font-size: 1.1em;
  font-weight: bold;
  color: #333;
}

.discount {
  color: #e74c3c;
  font-weight: normal;
  margin-left: 10px;
}

.product-rating {
  font-size: 1em;
  color: #f39c12;
}

.product-stock,
.product-warranty {
  font-size: 0.9em;
  color: #27ae60;
}

.product-card .product-meta,
.product-card .product-price {
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.product-card .product-rating {
  margin-top: 15px;
  font-weight: bold;
}

.product-card .product-stock,
.product-card .product-warranty {
  font-weight: normal;
}
</style>
