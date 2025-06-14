<script setup>
import { ref, computed } from 'vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';
const store = useInstrumentStore();
const summary = computed(() => store.summaryData);
const activeTab = ref('resumen');
const formatPercentage = (value) => {
    if (typeof value !== 'number') return '-';
    return `${value.toFixed(2)}%`;
};
</script>
<template>
  <div class="summary-container">
    <div class="summary-tabs">
        <button :class="{ active: activeTab === 'resumen' }" @click="activeTab = 'resumen'">Resumen</button>
        <button :class="{ active: activeTab === 'detalles' }" @click="activeTab = 'detalles'">Detalles</button>
    </div>
    <div v-if="activeTab === 'resumen' && summary" class="summary-content">
      <div class="summary-list">
        <div><span>Apertura</span><span>{{ summary.open }}</span></div>
        <div><span>Máximo Diario</span><span>{{ summary.high }}</span></div>
        <div><span>Mínimo Diario</span><span>{{ summary.low }}</span></div>
        <div><span>Cierre Anterior</span><span>{{ summary.previousClose }}</span></div>
        <div><span>Volumen</span><span>{{ new Intl.NumberFormat('es-CL').format(summary.volume) }}</span></div>
      </div>
    </div>
    <div v-if="activeTab === 'detalles' && summary" class="summary-content">
        <div class="summary-list">
            <div><span>Mercado</span><span>{{ summary.marketName }}</span></div>
            <div><span>Cotización</span><span>{{ summary.datetimeLast }}</span></div>
            <div><span>Apertura</span><span>{{ summary.open }}</span></div>
            <div><span>Cierre Anterior</span><span>{{ summary.previousClose }}</span></div>
            <div><span>Máximo Diario</span><span>{{ summary.high }}</span></div>
            <div><span>Mínimo Diario</span><span>{{ summary.low }}</span></div>
            <div><span>Máximo 52 Semanas</span><span>{{ summary.max52W }}</span></div>
            <div><span>Mínimo 52 Semanas</span><span>{{ summary.min52W }}</span></div>
        </div>
        <div class="summary-list variation-section">
            <div><span class="variation-title">Variación %</span></div>
            <div><span>1 Mes</span><span :class="{ positive: summary.pct30D >= 0, negative: summary.pct30D < 0 }">{{ formatPercentage(summary.pct30D) }}</span></div>
            <div><span>1 Año</span><span :class="{ positive: summary.pctRelW52 >= 0, negative: summary.pctRelW52 < 0 }">{{ formatPercentage(summary.pctRelW52) }}</span></div>
            <div><span>Año a la Fecha</span><span :class="{ positive: summary.pctRelCY >= 0, negative: summary.pctRelCY < 0 }">{{ formatPercentage(summary.pctRelCY) }}</span></div>
        </div>
    </div>
    <div v-if="!summary" class="placeholder">No hay datos disponibles.</div>
  </div>
</template>
<style scoped>
.summary-container { margin-top: 0; border-top: 1px solid #444; padding-top: 1rem; }
.summary-tabs { display: flex; gap: 0.5rem; border-bottom: 1px solid #444; margin-bottom: 1.5rem; }
.summary-tabs button { background: none; border: none; color: #aaa; padding: 0.5rem 1rem; cursor: pointer; font-size: 1rem; border-bottom: 2px solid transparent; }
.summary-tabs button.active { color: #fff; border-bottom-color: #55aaff; }
.summary-list { display: flex; flex-direction: column; gap: 0.8rem; font-size: 0.9rem; }
.summary-list > div { display: flex; justify-content: space-between; color: #ccc; }
.summary-list > div span:first-child { color: #999; }
.placeholder { color: #777; }
.positive { color: #4caf50; }
.negative { color: #f44336; }
.variation-section { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #444; }
.variation-title { font-weight: bold; color: #fff !important; }
</style>