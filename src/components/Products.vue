<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }});

  const selectedProduct = ref(null);


</script>

<template>
 <div class='grid grid-cols-3 gap-2'>
  <div v-for='product in props.data' :key='product?.id' class='' @click='openModal(product)'>
    <div class='img'>
      <img :src="product.image" alt="pro-image" />
    </div>
    <div class='flex justify-between'>
      {{ product.price }}
      {{ product.rating?.rate }}
      {{ product.rating?.count }}
    </div>
    <div>
      {{ product.title }}
    </div>
    <div>
      {{ product.description.slice(0, 30) }}
    </div>
  </div>
 </div>


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