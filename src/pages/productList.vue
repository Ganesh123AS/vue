<script setup>
import { ref, watch, computed } from 'vue';
import useGetProducts from '../hooks/useGetProducts';
import Products from '../components/Products.vue';

const { products, loading, error } = useGetProducts();
const searchQuery = ref('');
const selected = ref('');
const price = ref('');
const suggestions = ref([]);
const filteredProducts = ref([]);
let showSuggestion = false;

watch([products, searchQuery, selected, price], ([newProducts, newSearchQuery, newSelected, newPrice]) => {
    if (!Array.isArray(newProducts) || newProducts.length === 0) {
        filteredProducts.value = [];
        return;
    }

    let filtered = [...newProducts];

    // Filter by input field
    if (newSearchQuery.trim() !== '') {
        filtered = filtered?.filter(product =>
            product?.title.toLowerCase().includes(newSearchQuery.trim().toLowerCase())
        );
    }

    // // Filter by category
    // if (newSelected.trim() !== '') {
    //     filtered = filtered?.filter(product =>
    //         product?.category.toLowerCase().includes(newSelected.trim().toLowerCase())
    //     );
    // }

    // Filter by category
    if (newSelected.trim() !== '') {
        if (newSelected.trim() === 'Rating') {
            filtered = filtered.sort((a, b) => b?.rating?.rate - a?.rating?.rate);
        } else {
            filtered = filtered.filter(product =>
                product?.category.toLowerCase().includes(newSelected.trim().toLowerCase())
            );
        }
    }

    // filter by price
    if (newPrice === 'ascending') {
        filtered.sort((a, b) => b?.price - a?.price);
    } else if (newPrice === 'descending') {
        filtered.sort((a, b) => a?.price - b?.price);
    }

    filteredProducts.value = filtered;
    console.log(filteredProducts.value, "filtered products");
});

// reset button to clear field
function resetFilters() {
    searchQuery.value = '';
    selected.value = '';
    price.value = '';
}

// function to check suggestion
watch(products, (newProducts) => {
    // if suggestion is true
    if (showSuggestion) {
        suggestions.value = newProducts.slice(0, 4);
    }
});

// filtering product according to inputted query
function suggestProducts() {
    showSuggestion = true;
    if (!searchQuery.value.trim()) {
        suggestions.value = [];
        return;
    }

    //   search suggestion show upto 4 value only
    const searchRegex = new RegExp(searchQuery.value.trim(), 'i');
    suggestions.value = products?.value.filter(product => searchRegex.test(product?.title)).slice(0, 4);
}

// selct a suggestion value
function selectSuggestion(suggestion) {
    searchQuery.value = suggestion.title;
    suggestions.value = [];
    showSuggestion = false;
}
</script>

<template>
    <div class='lg:px-10 sm:px-5 md:px-8 mt-2'>

        <div class='flex justify-between'>
            <div class='relative'>
                <input type="text" v-model="searchQuery" @input='suggestProducts' @click='showSuggestion === true'
                    placeholder="Search Products..."
                    class="mb-2 px-4 py-2 rounded border border-gray-500 focus:outline-none focus:border-blue-500">
                <div class='absolute bg-slate-500 text-white rounded shadow-md w-25 h-32 overflow-y-auto'>
                    <ul v-if='showSuggestion && suggestions.length'>
                        <li v-for='suggestion in suggestions' :key='suggestion?.id' @click='selectSuggestion(suggestion)'>
                            {{ suggestion?.id }} {{ suggestion?.title }}
                        </li>
                    </ul>
                </div>
            </div>

            <select v-model="selected"
                class='mb-2 px-4 py-2 rounded border border-gray-500 focus:outline-none focus:border-blue-500'>
                <option disabled value="">Please select Category</option>
                <option>Men's Clothing</option>
                <option>Women's Clothing</option>
                <option>Jewelery</option>
                <option>Electronics</option>
                <option>Rating</option>
            </select>

            <select v-model="price"
                class='mb-2 px-4 py-2 rounded border border-gray-500 focus:outline-none focus:border-blue-500'>
                <option disabled value="">Price</option>
                <option value="ascending">High</option>
                <option value="descending">Low</option>
            </select>
            <button @click="resetFilters"
                class='mb-2 px-4 py-2 rounded border border-gray-500 focus:outline-none hover:bg-blue-500 hover:text-white'>Reset</button>
        </div>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error }}</div>

        <Products :data="filteredProducts" />
</div></template>
