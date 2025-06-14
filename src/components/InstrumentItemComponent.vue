<script setup>
import { computed } from 'vue';
import { useInstrumentStore } from '@/store/useInstrumentStore';

const props = defineProps({
  instrument: {
    type: Object,
    required: true,
  },
});

const store = useInstrumentStore();

const isSelected = computed(() =>
  store.selectedInstrument?.base.codeInstrument === props.instrument.codeInstrument
);

function selectThisInstrument() {
  store.selectInstrument(props.instrument.codeInstrument);
}


const formatPercentage = (value) => {
  if (typeof value !== 'number') return '-';
  return `${value.toFixed(2)}%`;
};


const formatVolume = (value) => {
  if (typeof value !== 'number') return '-';
  return (value / 1000000).toFixed(2);
};
</script>

<template>
  <div 
    class="instrument-item" 
    :class="{ selected: isSelected }"
    @click="selectThisInstrument"
  >
    <span class="name">{{ instrument.shortName }}</span>
    <span class="value">{{ instrument.lastPrice.toFixed(2) }}</span>
    <span class="value">{{ formatVolume(instrument.volumeMoney) }}</span>
    <span 
      :class="['variation', { positive: instrument.pctDay >= 0, negative: instrument.pctDay < 0 }]"
    >
      {{ formatPercentage(instrument.pctDay) }}
    </span>
    <span 
      :class="['variation', { positive: instrument.pct30D >= 0, negative: instrument.pct30D < 0 }]"
    >
      {{ formatPercentage(instrument.pct30D) }}
    </span>
    <span 
      :class="['variation', { positive: instrument.pctCY >= 0, negative: instrument.pctCY < 0 }]"
    >
      {{ formatPercentage(instrument.pctCY) }}
    </span>
    <span 
      :class="['variation', { positive: instrument.pct1Y >= 0, negative: instrument.pct1Y < 0 }]"
    >
      {{ formatPercentage(instrument.pct1Y) }}
    </span>
  </div>
</template>

<style scoped>
.instrument-item {
  display: grid;
  grid-template-columns: 2fr repeat(6, 1fr);
  padding: 0.6rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #333;
  font-size: 0.78rem;
}

.instrument-item:hover {
  background-color: #3a3a3a;
}

.instrument-item.selected {
  background-color: #4a5a7a;
}

.instrument-item span {
  text-align: right;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.instrument-item .name {
  text-align: left;
  font-weight: bold;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f44336;
}


@media (max-width: 768px) {
  .instrument-item {
    font-size: 0.7rem;
  }
}
</style>
