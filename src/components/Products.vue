<script setup>
import { defineProps, ref } from 'vue';
import ViewModal from './ViewModal.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }});

  const selectedProduct = ref(null);
  const isOpen = ref(false);
console.log(isOpen, open)
  const openModal = (product) => {
    selectedProduct.value = product;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

</script>

<template>
 <div class='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2'>
  <div v-for='product in props.data' :key='product?.id' @click='openModal(product)'>
    <div class='img flex justify-center items-center'>
      <img :src="product?.image" alt="pro-image" />
    </div>
    <div class='flex flex-col'>
      RS. {{ product?.price }}
      <div class='flex justify-between'>
        <div class='flex'>
          <span>Rating:</span> <h6>{{ product?.rating?.rate }}</h6>
        </div>
        <div class='flex'>
          <span>Remaining:</span> <p>{{ product?.rating?.count }}</p>
        </div>
      </div>
    </div>
    <div>
      {{ product?.title }}
    </div>
    <div>
      {{ product?.description.slice(0, 20) }}
    </div>
  </div>
 </div>

 <ViewModal :isOpen="isOpen" :product="selectedProduct" :closeModal="closeModal" />
</template>


<style>
.container{
  height: 60vh;
}
.img{
  height: 30vh;
  width: 240px;
}
.img img{
  height: 100%;
  width: 100%;
}
</style>