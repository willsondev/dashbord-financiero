<script setup>
import { ref } from 'vue';

const tabs = ['IPSA', 'IGPA', 'NASDAQ', 'DOW JONES', 'SP/BVL'];
const activeTab = ref('IPSA');
</script>

<template>
  <div class="tab-container">
    <button 
      v-for="tab in tabs" 
      :key="tab"
      :class="{ active: activeTab === tab }"
      @click="activeTab = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>

<style scoped>
.tab-container {
  display: flex;
  border-bottom: 1px solid #444;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.tab-container button {
  background: none;
  border: none;
  color: #aaa;
  padding: 0.8rem 1rem;
  cursor: pointer;
  font-size: 0.85rem; 
  border-bottom: 2px solid transparent;
  white-space: nowrap;
}

.tab-container button.active {
  color: #fff;
  border-bottom-color: #55aaff;
}
</style>
