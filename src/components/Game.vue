<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark py-8 px-4">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex items-center justify-between flex-wrap gap-4">
        <button
          @click="goHome"
          class="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
          aria-label="Volver al inicio"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="font-semibold">Volver</span>
        </button>

        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Memory Master
        </h1>

        <div class="w-24"></div> <!-- Spacer for centering -->
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <SkeletonLoader
          v-for="n in pairsCount * 2"
          :key="n"
          variant="card"
          height="h-40"
        />
      </div>
    </div>

    <!-- Game Content -->
    <div v-else class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Game Board -->
        <div class="lg:col-span-3">
          <div
            class="grid gap-4 justify-items-center"
            :class="gridClasses"
            role="grid"
            aria-label="Tablero de juego de memoria"
          >
            <MemoryCard
              v-for="(pokemon, index) in pokemonList"
              :key="`${pokemon.id}-${index}`"
              :pokemon="pokemon"
              :index="index"
              :is-flipped="isCardFlipped(index)"
              :is-matched="isCardMatched(index)"
              :size="cardSize"
              @flip="flipCard"
            />
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Timer -->
          <GameTimer
            :formatted-time="formattedTime"
            :is-running="isRunning"
            @start="start"
            @pause="pause"
            @reset="resetTimer"
          />

          <!-- Stats -->
          <GameStats
            :progress="progress"
            :matched-pairs="matchedPairs.length / 2"
            :total-pairs="pokemonList.length / 2"
            :difficulty="difficulty"
          />

          <!-- Actions -->
          <BaseCard>
            <BaseButton
              variant="outline"
              size="md"
              class="w-full mb-3"
              @click="resetGame"
              aria-label="Reiniciar juego"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
              </svg>
              Reiniciar
            </BaseButton>

            <BaseButton
              variant="ghost"
              size="md"
              class="w-full"
              @click="goHome"
              aria-label="Cambiar dificultad"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              </svg>
              Cambiar Nivel
            </BaseButton>
          </BaseCard>
        </div>
      </div>
    </div>

    <!-- Victory Modal -->
    <BaseModal
      v-model="gameCompleted"
      :close-on-backdrop="false"
      :show-close="false"
    >
      <template #title>
        ¡Felicitaciones! 🎉
      </template>

      <div class="text-center py-6">
        <div class="text-6xl mb-6">🏆</div>
        <p class="text-xl text-slate-600 dark:text-slate-300 mb-6">
          ¡Has completado el juego con éxito!
        </p>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
            <div class="text-3xl font-bold text-primary">{{ formattedTime }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">Tiempo</div>
          </div>
          <div class="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-xl">
            <div class="text-3xl font-bold text-secondary">{{ pokemonList.length / 2 }}</div>
            <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">Pares</div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex flex-col sm:flex-row gap-3 justify-between">
          <BaseButton variant="ghost" @click="goHome" class="order-2 sm:order-1">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Salir
          </BaseButton>
          <div class="flex gap-3 order-1 sm:order-2">
            <BaseButton variant="outline" @click="playAgain">
              Jugar de Nuevo
            </BaseButton>
            <BaseButton @click="goHome">
              Cambiar Nivel
            </BaseButton>
          </div>
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMemoryGame } from '../composables/useMemoryGame';
import { useTimer } from '../composables/useTimer';
import MemoryCard from './game/MemoryCard.vue';
import GameTimer from './game/GameTimer.vue';
import GameStats from './game/GameStats.vue';
import BaseCard from './base/BaseCard.vue';
import BaseButton from './base/BaseButton.vue';
import BaseModal from './base/BaseModal.vue';
import SkeletonLoader from './base/SkeletonLoader.vue';

const route = useRoute();
const router = useRouter();

const difficulty = ref(parseInt(route.params.difficulty) || 1);

const pairsMap = {
  1: 12,
  2: 18,
  3: 24
};

const pairsCount = computed(() => pairsMap[difficulty.value] || 12);

const {
  pokemonList,
  loading,
  gameStarted,
  gameCompleted,
  progress,
  matchedPairs,
  initializeGame,
  flipCard,
  isCardFlipped,
  isCardMatched,
  resetGame: resetMemoryGame
} = useMemoryGame();

const {
  formattedTime,
  isRunning,
  start,
  pause,
  reset: resetTimer
} = useTimer();

const gridClasses = computed(() => {
  const cols = {
    1: 'grid-cols-4 md:grid-cols-6',
    2: 'grid-cols-4 md:grid-cols-6',
    3: 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8'
  };
  return cols[difficulty.value] || cols[1];
});

const cardSize = computed(() => {
  return difficulty.value === 3 ? 'sm' : difficulty.value === 2 ? 'md' : 'md';
});

const resetGame = () => {
  resetMemoryGame();
  resetTimer();
  start();
};

const playAgain = () => {
  initializeGame(pairsCount.value);
  resetTimer();
  start();
};

const goHome = () => {
  router.push({ name: 'home' });
};

// Auto-start timer when game starts (first card is flipped)
watch(gameStarted, (started) => {
  if (started && !isRunning.value) {
    start();
  }
});

// Pause timer when game is completed
watch(gameCompleted, (completed) => {
  if (completed) {
    pause();
  }
});

onMounted(() => {
  initializeGame(pairsCount.value);
});
</script>
