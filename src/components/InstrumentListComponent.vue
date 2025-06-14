<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';
import InstrumentItemComponent from './InstrumentItemComponent.vue';

const store = useInstrumentStore();
const instruments = computed(() => store.filteredInstrumentList);

const midpoint = computed(() => Math.ceil(instruments.value.length / 2));
const leftColumn = computed(() => instruments.value.slice(0, midpoint.value));
const rightColumn = computed(() => instruments.value.slice(midpoint.value));
</script>

<template>
  <div class="instrument-list-container">
    <div class="two-column-layout">
      <!-- Columna Izquierda -->
      <div class="column">
        <div class="list-header">
          <span>Nombre</span>
          <span>Último</span>
          <span>Monto (MM)</span>
          <span>Var. Día</span>
          <span>Var 30d</span>
          <span>Año Actual</span>
          <span>12 Meses</span>
        </div>
        <div class="list-body">
          <InstrumentItemComponent 
            v-for="instrument in leftColumn" 
            :key="instrument.codeInstrument"
            :instrument="instrument"
          />
        </div>
      </div>

      <!-- Columna Derecha -->
      <div class="column">
        <div class="list-header">
          <span>Nombre</span>
          <span>Último</span>
          <span>Monto (MM)</span>
          <span>Var. Día</span>
          <span>Var 30d</span>
          <span>Año Actual</span>
          <span>12 Meses</span>
        </div>
        <div class="list-body">
          <InstrumentItemComponent 
            v-for="instrument in rightColumn" 
            :key="instrument.codeInstrument"
            :instrument="instrument"
          />
        </div>
      </div>
    </div>

    <div class="notes">
      <div>* Último precio, Monto Transado y Variación diaria con desface de 15 minutos. Haz click en cada instrumento para ver la información actualizada en el gráfico.</div>
      <div>** Variaciones a 30d, Año Actual y 12 meses calculadas con el precio de cierre al último día hábil.</div>
    </div>
  </div>
</template>

<style scoped>
.instrument-list-container {
  margin-top: 1rem;
  width: 100%;
  box-sizing: border-box;
}


.two-column-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}


.list-header {
  display: grid;
  grid-template-columns: 2fr repeat(6, 1fr);
  color: #999;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #444;
  font-weight: bold;
  font-size: 11px;
}

.list-header span:not(:first-child) {
  text-align: right;
}

.list-body {
  font-size: 10px;
}


.notes {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #777;
}


@media (max-width: 768px) {
  .two-column-layout {
    grid-template-columns: 1fr;
  }

  .list-header {
    font-size: 10px;
  }

  .list-body {
    max-height: 200px;
    overflow-y: auto;
    padding-right: 0.5rem;
    font-size: 9px;
  }
}
</style>
