<script setup>
import { defineProps, ref } from 'vue';
import ViewModal from './ViewModal.vue';

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

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
  <div class='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
    <div v-for='product in props.data' :key='product?.id'
      class='bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div class='img flex justify-center items-center'>
        <img :src="product?.image" alt="pro-image" class='rounded-t-lg' />
      </div>
      <div class='flex flex-col mt-2 text-center'>
        <h5>
          RS. {{ product?.price }}
        </h5>
        <div class='flex justify-between px-3'>
          <div class='flex items-center'>
            <span>Rating: </span>
            <h6 class='text-gray-500'>{{ product?.rating?.rate }}</h6>
          </div>
          <div class='flex items-center'>
            <span>Remaining: </span>
            <p class='text-gray-500'>{{ product?.rating?.count }}</p>
          </div>
        </div>
      </div>
      <div class='px-3 text-black-800'>
        <h6>
          {{ product?.title.slice(0, 20) }}...
        </h6>
      </div>
      <div class='px-3'>
        <p>
          {{ product?.description.slice(0, 50) }}...
        </p>
      </div>
      <div class="flex justify-center items-center">
        <button @click="openModal(product)" class="px-4 py-2 text-black hover:bg-lime-600 hover:text-white border rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:border-lime-900">
    View
</button>

      </div>

    </div>
  </div>

  <ViewModal :isOpen="isOpen" :product="selectedProduct" :closeModal="closeModal" />
</template>


<style>
.container {
  height: 60vh;
}

.img {
  height: 30vh;
  width: 240px;
}

.img img {
  height: 100%;
  width: 100%;
}

p {
  font-size: 16px;
}

h5 {
  font-size: 24px;
  font-weight: 700;
}

h6 {
  font-size: 19px;
  font-weight: 500;
}</style>