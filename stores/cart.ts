import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<Product[]>([]);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    cartItems.value.push(product);
  };

  // Remove a product from the cart by ID
  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId);
  };

  // Computed property for total price
  const total = computed(() =>
    cartItems.value.reduce((acc, item) => acc + item.price, 0)
  );

  // Computed property for cart item count
  const cartCount = computed(() => cartItems.value.length);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    total,
    cartCount,
  };
});
