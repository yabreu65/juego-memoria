<template>
  <div class="card">
    <h3 class="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
      Progreso
    </h3>

    <div class="space-y-4">
      <!-- Progress Bar -->
      <div>
        <div class="flex justify-between text-sm mb-2">
          <span class="text-slate-600 dark:text-slate-300">Completado</span>
          <span class="font-bold text-primary">{{ progress }}%</span>
        </div>
        <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out rounded-full"
            :style="{ width: `${progress}%` }"
            role="progressbar"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
          <div class="text-2xl font-bold text-primary">{{ matchedPairs }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Pares</div>
        </div>
        <div class="text-center p-3 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
          <div class="text-2xl font-bold text-secondary">{{ totalPairs }}</div>
          <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">Total</div>
        </div>
      </div>

      <!-- Difficulty Badge -->
      <div class="flex justify-center">
        <span :class="difficultyBadgeClass">
          {{ difficultyText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  progress: {
    type: Number,
    required: true
  },
  matchedPairs: {
    type: Number,
    required: true
  },
  totalPairs: {
    type: Number,
    required: true
  },
  difficulty: {
    type: Number,
    default: 1
  }
});

const difficultyText = computed(() => {
  const difficulties = {
    1: 'Fácil',
    2: 'Medio',
    3: 'Difícil'
  };
  return difficulties[props.difficulty] || 'Personalizado';
});

const difficultyBadgeClass = computed(() => {
  const base = 'px-4 py-2 rounded-full text-sm font-semibold';
  const colors = {
    1: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    2: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    3: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  };
  return `${base} ${colors[props.difficulty] || colors[1]}`;
});
</script>
