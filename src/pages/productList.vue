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
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(newSearchQuery.trim().toLowerCase())
        );
    }

    // Filter by category
    if (newSelected.trim() !== '') {
        filtered = filtered.filter(product =>
            product.category.toLowerCase().includes(newSelected.trim().toLowerCase())
        );
    }

    // filter by price
    if (newPrice === 'ascending') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (newPrice === 'descending') {
        filtered.sort((a, b) => b.price - a.price);
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
    suggestions.value = products.value.filter(product => searchRegex.test(product.title)).slice(0, 4);
}

// selct a suggestion value
function selectSuggestion(suggestion) {
    searchQuery.value = suggestion.title;
    suggestions.value = [];
    showSuggestion = false;
}
</script>

<template>
    <div>
        <h1 class="text-red-800 uppercase">Products</h1>
        <input type="text" v-model="searchQuery" @input='suggestProducts' @click='showSuggestion === true'
            placeholder="Search Products...">
        <ul v-if='showSuggestion && suggestions.length'>
            <li v-for='suggestion in suggestions' :key='suggestion?.id' @click='selectSuggestion(suggestion)'>{{
                suggestion?.title }}</li>
        </ul>

        <select v-model="selected">
            <option disabled value="">Please select Category</option>
            <option>men's clothing</option>
            <option>women's clothing</option>
            <option>jewelery</option>
            <option>electronics</option>
        </select>

        <select v-model="price">
            <option disabled value="">Price</option>
            <option value="ascending">Price Ascending</option>
            <option value="descending">Price Descending</option>
        </select>
        <button @click="resetFilters">Reset</button>
        <div v-if="loading">Loading...</div>
        <div v-if="error">Error: {{ error }}</div>
        <div v-else>No products found</div>
        <Products :data="filteredProducts" />
    </div>
</template>
