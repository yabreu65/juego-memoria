<template>
  <div class="card text-center">
    <div class="mb-4">
      <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
        Tiempo
      </h3>
      <div class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {{ formattedTime }}
      </div>
    </div>

    <div class="flex gap-3 justify-center">
      <button
        v-if="!isRunning"
        @click="$emit('start')"
        class="p-3 rounded-xl bg-green-500 hover:bg-green-600 text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Iniciar cronómetro"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
      </button>

      <button
        v-if="isRunning"
        @click="$emit('pause')"
        class="p-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Pausar cronómetro"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>

      <button
        @click="$emit('reset')"
        class="p-3 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg"
        aria-label="Reiniciar cronómetro"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  formattedTime: {
    type: String,
    required: true
  },
  isRunning: {
    type: Boolean,
    default: false
  }
});

defineEmits(['start', 'pause', 'reset']);
</script>
