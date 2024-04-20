<script setup>
import { defineProps, ref } from "vue";
import ViewModal from "./ViewModal.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const selectedProduct = ref(null);
const isOpen = ref(false);

const openModal = (product) => {
  selectedProduct.value = product;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const getStarRating = (rating) => {
  const roundedRating = Math.round(rating);
  return '⭐'.repeat(roundedRating);
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
    <div
      v-for="product in props.data"
      :key="product.id"
      class="product-card"
      @click="openModal(product)"
    >
      <div class="product-image">
        <img :src="product.image" alt="Product Image" />
      </div>
      <div class="product-details">
        <div class="product-info">
          <div class="product-title">{{ product.title.slice(0, 16) }}...</div>
          <div class="product-description">{{ product.description.slice(0, 45) }}...</div>
        </div>
        <div class="product-meta">
          <div class="product-price">RS. {{ product.price }}</div>
          <div class="product-remaining">Remaining: {{ product.rating.count }}</div>
        </div>
          <div class="product-rating">{{ getStarRating(product.rating.rate) }}</div>
      </div>
    </div>
  </div>

  <ViewModal
    :isOpen="isOpen"
    :product="selectedProduct"
    :closeModal="closeModal"
  />
</template>

<style>
.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-image {
  height: 140px;
  overflow: hidden;
  padding:10px 25px;
}

.product-image img {
  width: 100%;
  height: 100%;
}

.product-details {
  padding: 1rem;
}

.product-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 0.9rem;
  font-weight: bold;
  color:green
}

.product-remaining {
  font-size: 0.8rem;
  color: #718096;
}
</style>