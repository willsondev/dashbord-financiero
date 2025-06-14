<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const store = useInstrumentStore();
const activePeriod = ref('1A');
const periods = ['1D', '1S', '1M', '3M', '6M', '1A'];

const chartData = computed(() => {
  const history = store.selectedInstrument?.history?.chart;
  if (!history || history.length === 0) return { labels: [], datasets: [] };
  let dataPoints = [];
  switch (activePeriod.value) {
    case '1D': dataPoints = history.slice(-2); break;
    case '1S': dataPoints = history.slice(-7); break;
    case '1M': dataPoints = history.slice(-30); break;
    case '3M': dataPoints = history.slice(-90); break;
    case '6M': dataPoints = history.slice(-180); break;
    default: dataPoints = history; break;
  }
  const labels = dataPoints.map(item => new Date(item.datetimeLastPriceTs * 1000).toLocaleDateString('es-CL'));
  const values = dataPoints.map(item => item.closePrice);
  return {
    labels,
    datasets: [{
      label: store.selectedInstrument.details?.info.name || '',
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, "rgba(75, 192, 192, 0.5)");
        gradient.addColorStop(1, "rgba(75, 192, 192, 0)");
        return gradient;
      },
      borderColor: 'rgba(75, 192, 192, 1)',
      data: values,
      fill: true,
      tension: 0.4,
    }],
  };
});

const windowWidth = ref(window.innerWidth);
const onResize = () => { windowWidth.value = window.innerWidth; };
onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));

const chartOptions = computed(() => {
  const isMobile = windowWidth.value < 768;
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        display: !isMobile, 
        ticks: {
          color: '#999',
          maxTicksLimit: isMobile ? 5 : 8,
        },
        grid: { color: '#444' }
      },
      y: {
        ticks: { color: '#999' },
        grid: { color: '#444' }
      },
    },
  };
});
</script>

<template>
  <div class="chart-container">
    <div class="chart-wrapper">
      <Line
        v-if="chartData.datasets.length && chartData.datasets[0].data.length"
        :data="chartData"
        :options="chartOptions"
      />
      <div v-else class="placeholder">No hay datos históricos disponibles.</div>
    </div>
    <div class="periods">
      <button
        v-for="period in periods"
        :key="period"
        :class="{ active: activePeriod === period }"
        @click="activePeriod = period"
      >
        {{ period }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  overflow-x: hidden;
  padding-top: 1.5rem;
  border-top: 1px solid #444;
  box-sizing: border-box;
}

.chart-wrapper {
  width: 100%;
  height: 250px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
}

.placeholder {
  color: #777;
}

.periods {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.periods button {
  background: #333;
  border: 1px solid #555;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.periods button.active {
  background-color: #55aaff;
  border-color: #55aaff;
}
</style>