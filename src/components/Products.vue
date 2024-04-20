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
 <div class='grid grid-cols-3 gap-2'>
  <div v-for='product in props.data' :key='product?.id' class='' @click='openModal(product)'>
    <div class='img'>
      <img :src="product?.image" alt="pro-image" />
    </div>
    <div class='flex justify-between'>
      {{ product?.price }}
      {{ product?.rating?.rate }}
      {{ product?.rating?.count }}
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