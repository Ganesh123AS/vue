import { ref, onMounted } from 'vue';

const useGetProducts = () => {
  const products = ref([]);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to get products item');
      }
      const data = await response.json();
      products.value = data;
      console.log(products, "pro")
      loading.value = false;
    } catch (e) {
      error.value = e.message;
      loading.value = false;
    }
  });

  return { products, loading, error };
}

export default useGetProducts;