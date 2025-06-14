<script setup>
import { useInstrumentStore } from '@/store/useInstrumentStore';
const store = useInstrumentStore();
function handleInput(event) {
  store.updateSearchTerm(event.target.value);
}
</script>
<template>
  <div class="search-bar">
    <span class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </span>
    <input 
      type="text" 
      placeholder="Busca un instrumento"
      :value="store.searchTerm"
      @input="handleInput"
    >
  </div>
</template>
<style scoped>
.search-bar {
  position: relative;
  width: 100%;
}
.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
    pointer-events: none;
}
.search-bar input {
  background-color: #333;
  border: 1px solid #555;
  color: #fff;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border-radius: 5px;
  width: 100%;
  outline: none;
  box-sizing: border-box;
}
</style>