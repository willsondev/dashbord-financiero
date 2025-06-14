import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import constituentData from '@/services/constituyentes/constituensList.json';
const resumeModules = import.meta.glob('../services/resumen/*.json');
const historyModules = import.meta.glob('../services/history/history-*.json');


export const useInstrumentStore = defineStore('instrumentStore', () => {
 
  const instrumentList = ref([]);
  const selectedInstrument = ref(null);
  const isLoading = ref(false);
  const searchTerm = ref('');
  const error = ref(null);



  const filteredInstrumentList = computed(() => {
    if (!searchTerm.value) {
      return instrumentList.value;
    }
    return instrumentList.value.filter(
      (instrument) =>
        instrument.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        instrument.shortName.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  const headerData = computed(() => {
    if (!selectedInstrument.value) return null;

    if (selectedInstrument.value.details) {
        const details = selectedInstrument.value.details;
        return {
            name: details.info.name,
            value: details.price.lastPrice,
            variationPercent: details.price.performanceRelative,
            variationPoints: details.price.performanceAbsolute,
        };
    }

    if (selectedInstrument.value.base) {
        const base = selectedInstrument.value.base;
        return {
            name: base.name,
            value: base.lastPrice,
            variationPercent: base.pctDay,
            variationPoints: base.performanceAbsolute,
        };
    }
    
    return null;
  });
  

  const summaryData = computed(() => {
    if (!selectedInstrument.value?.details) return null;
    const details = selectedInstrument.value.details;
    return {
     
      open: details.price.openPrice,
      high: details.price.maxDay,
      low: details.price.minDay,
      previousClose: details.price.closePrice,
      volume: details.price.accumulatedVolumeMoney,
  
      marketName: details.info.marketName, 
      datetimeLast: details.price.datetimeLastPrice,
      max52W: details.price.max52W,
      min52W: details.price.min52W,
      pct30D: details.price.pct30D,
      pctRelW52: details.price.pctRelW52,
      pctRelCY: details.price.pctRelCY,
    }
  });


  function fetchInstrumentList() {
    try {
      instrumentList.value = constituentData.data.constituents;
      selectInstrument('IPSA');
    } catch (e) {
      error.value = "Error al cargar la lista de instrumentos.";
      console.error(e);
    }
  }

  function hasDataFor(codeInstrument) {
    const resumePath = `../services/resumen/${codeInstrument}.json`;
    const historyPath = `../services/history/history-${codeInstrument}.json`;
    return !!(resumeModules[resumePath] && historyModules[historyPath]);
  }

  async function selectInstrument(codeInstrument) {
    isLoading.value = true;
    error.value = null;

    const baseInstrumentData = instrumentList.value.find(
      inst => inst.codeInstrument === codeInstrument
    );

    if (!baseInstrumentData) {
      error.value = `Instrumento ${codeInstrument} no encontrado en la lista.`;
      isLoading.value = false;
      return;
    }
    
    selectedInstrument.value = { base: baseInstrumentData, details: null, history: null };

    if (hasDataFor(codeInstrument)) {
        try {
            const resumePath = `../services/resumen/${codeInstrument}.json`;
            const historyPath = `../services/history/history-${codeInstrument}.json`;
            
            const [detailsModule, historyModule] = await Promise.all([
                resumeModules[resumePath](),
                historyModules[historyPath]()
            ]);

            selectedInstrument.value.details = detailsModule.default.data;
            selectedInstrument.value.history = historyModule.default.data;

        } catch (e) {
            console.error(`Error al cargar datos detallados para ${codeInstrument}, pero se mostrarán los datos básicos.`, e);
            error.value = `No se pudieron cargar los detalles para ${codeInstrument}.`;
        }
    } else {
        console.warn(`No hay archivos de resumen/historial para ${codeInstrument}. Mostrando solo datos básicos.`);
    }

    isLoading.value = false;
  }

  function updateSearchTerm(term) {
    searchTerm.value = term;
  }

  return {
    instrumentList,
    selectedInstrument,
    isLoading,
    searchTerm,
    error,
    filteredInstrumentList,
    headerData,
    summaryData,
    fetchInstrumentList,
    selectInstrument,
    updateSearchTerm,
    hasDataFor,
  };
});