<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    isOpen: Boolean,
    product: Object,
    closeModal: Function,
});
console.log(props, "open")

</script>


<template>
    <div v-if="isOpen" class="container" @click="closeModal">
        <div class="pro-content" @click.stop>
            <div class="pro-header">
                <h2>{{ product?.title }}</h2>
                <button @click="props.closeModal">Close</button>
            </div>
            <div class="pro-body">
                <img :src="product?.image" alt="pro-img" />
                <p>{{ product?.price }}</p>
                <p>{{ product?.description }}</p>
                <p v-if="product?.rating">
                    Rating: {{ product?.rating?.rate }} ({{ product?.rating?.count }} reviews)
                </p>
            </div>
        </div>
    </div>
</template>
  
<style>
.container {
    position: fixed;
    top: 20%;
    left: 10%;
    width: 80%;
    height: 70vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.pro-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.pro-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.pro-header h2 {
    margin: 0;
}

.pro-body img {
    width: 100%;
    height: 60vh;
}
</style>
  