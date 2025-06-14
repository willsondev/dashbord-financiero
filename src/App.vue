<script setup>
import { onMounted } from 'vue';
import { useInstrumentStore } from './store/useInstrumentStore';
import HeaderComponent from './components/HeaderComponent.vue';
import ChartComponent from './components/ChartComponent.vue';
import SummaryComponent from './components/SummaryComponent.vue';
import TabComponent from './components/TabComponent.vue';
import SearchBarComponent from './components/SearchBarComponent.vue';
import InstrumentListComponent from './components/InstrumentListComponent.vue';

const store = useInstrumentStore();

onMounted(() => {
  store.fetchInstrumentList();
});
</script>

<template>
  <div class="dashboard-container">
    <header class="main-header">
  
      <SearchBarComponent />
    </header>

    <div v-if="store.error" class="error-message">
      {{ store.error }}
    </div>

    <main class="main-content">
      <div class="top-panel">
        <div v-if="store.isLoading" class="loading-overlay">Cargando...</div>
        <template v-else>
          <HeaderComponent />
          <div class="chart-summary-row">
            <ChartComponent />
            <SummaryComponent />
          </div>
        </template>
      </div>

      <div class="bottom-panel">
        <TabComponent />
        <InstrumentListComponent />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #1e1e1e;
  color: #f0f0f0;
  padding: 1rem;
  font-family: Arial, sans-serif;
  min-height: 100vh;
}
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #444;
  padding-bottom: 1rem;
}
.main-title {
  color: #e0e0e0;
  font-size: 1.5rem;
  flex-shrink: 0;
}
.error-message {
  background-color: #8d2a2a;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}
.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.top-panel, .bottom-panel {
  background-color: #2a2a2a;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #3c3c3c;
  position: relative;
}
.chart-summary-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-top: 1.5rem;
}
.loading-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(42, 42, 42, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 10;
  border-radius: 8px;
}


@media (max-width: 992px) {
    .chart-summary-row {
    }
}
@media (max-width: 768px) {
    .dashboard-container {
        padding: 0.5rem;
    }
    .main-header {
        flex-direction: column;
        align-items: stretch; 
        gap: 1rem;
    }
}
</style>