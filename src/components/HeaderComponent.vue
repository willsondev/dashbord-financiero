<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';

const store = useInstrumentStore();
const instrument = computed(() => store.headerData);

const isPositive = computed(() => {
  return instrument.value && instrument.value.variationPercent >= 0;
});
</script>

<template>
  <div v-if="instrument" class="header-info">
   
    <h2>IPSA, CHILE</h2>
    <h4>Indice</h4> 
   
    <div class="values">
      <span class="main-value">Valor Actual {{ instrument.value?.toFixed(2) }}</span>
      <span :class="['variation', { positive: isPositive, negative: !isPositive }]">
       Var.% Actual {{ instrument.variationPercent?.toFixed(2) }}%
      </span>
      <span class="points">Var. Puntos {{ instrument.variationPoints?.toFixed(2) }}</span>
    </div>
  </div>
  <div v-else class="placeholder">Seleccione un instrumento.</div>
</template>

<style scoped>
.header-info h2 { font-size: 1.8rem; margin-bottom: 0.5rem; }
.values { display: flex; align-items: baseline; gap: 1rem; }
.main-value { font-size: 1rem; font-weight: bold; }
.variation { font-size: 1.2rem; padding: 0.2rem 0.5rem; border-radius: 4px; }
.positive { color: #4caf50; background-color: rgba(76, 175, 80, 0.1); }
.negative { color: #f44336; background-color: rgba(244, 67, 54, 0.1); }
.points { color: #999; }
.placeholder { color: #777; font-style: italic; }
</style>