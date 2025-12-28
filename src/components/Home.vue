<template>
  <div class="min-h-screen gradient-hero flex items-center justify-center p-4 overflow-hidden">
    <!-- Background Decorations -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s;"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl w-full animate-fade-in">
      <!-- Hero Section -->
      <div class="text-center mb-12 animate-slide-up">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
          Memory Master
        </h1>
        <p class="text-xl md:text-2xl text-text-light/90 mb-8 max-w-2xl mx-auto">
          Desafía tu mente con nuestro juego de memoria premium. Encuentra los pares y mejora tu concentración.
        </p>
      </div>

      <!-- Difficulty Selection Card -->
      <BaseCard variant="elevated" padding="lg" class="max-w-2xl mx-auto backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-text-dark dark:text-text-light mb-2">
            Selecciona la Dificultad
          </h2>
          <p class="text-slate-600 dark:text-slate-400">
            Elige el nivel que mejor se adapte a tu habilidad
          </p>
        </div>

        <!-- Difficulty Options -->
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <button
            v-for="level in difficultyLevels"
            :key="level.id"
            @click="selectDifficulty(level.id)"
            :class="[
              'p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50',
              selectedDifficulty === level.id
                ? 'border-primary bg-primary/10 shadow-lg'
                : 'border-slate-300 dark:border-slate-600 hover:border-primary/50'
            ]"
            :aria-label="`Seleccionar nivel ${level.name}`"
            role="radio"
            :aria-checked="selectedDifficulty === level.id"
          >
            <div class="text-4xl mb-3">{{ level.icon }}</div>
            <h3 class="text-xl font-bold text-text-dark dark:text-text-light mb-2">
              {{ level.name }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {{ level.description }}
            </p>
            <div class="text-xs font-semibold" :class="level.color">
              {{ level.pairs }} pares
            </div>
          </button>
        </div>

        <!-- Start Button -->
        <div class="flex justify-center">
          <BaseButton
            size="lg"
            @click="startGame"
            :disabled="!selectedDifficulty"
            :aria-label="selectedDifficulty ? 'Iniciar juego' : 'Selecciona una dificultad primero'"
          >
            <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            Comenzar Juego
          </BaseButton>
        </div>
      </BaseCard>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-6 mt-12 animate-slide-up" style="animation-delay: 0.2s;">
        <div class="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div class="text-4xl mb-3">🧠</div>
          <h3 class="text-lg font-semibold text-text-light mb-2">Entrena tu Cerebro</h3>
          <p class="text-sm text-text-light/80">Mejora tu memoria y concentración</p>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div class="text-4xl mb-3">⚡</div>
          <h3 class="text-lg font-semibold text-text-light mb-2">Diseño Premium</h3>
          <p class="text-sm text-text-light/80">Experiencia visual de alto nivel</p>
        </div>
        <div class="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div class="text-4xl mb-3">📊</div>
          <h3 class="text-lg font-semibold text-text-light mb-2">Seguimiento</h3>
          <p class="text-sm text-text-light/80">Monitorea tu progreso en tiempo real</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseCard from './base/BaseCard.vue';
import BaseButton from './base/BaseButton.vue';

const router = useRouter();
const selectedDifficulty = ref(null);

const difficultyLevels = [
  {
    id: 1,
    name: 'Fácil',
    description: 'Perfecto para principiantes',
    icon: '😊',
    pairs: 12,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 2,
    name: 'Medio',
    description: 'Un desafío equilibrado',
    icon: '🤔',
    pairs: 18,
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 3,
    name: 'Difícil',
    description: 'Para expertos',
    icon: '🔥',
    pairs: 24,
    color: 'text-red-600 dark:text-red-400'
  }
];

const selectDifficulty = (id) => {
  selectedDifficulty.value = id;
};

const startGame = () => {
  if (selectedDifficulty.value) {
    router.push({
      name: 'game',
      params: { difficulty: selectedDifficulty.value }
    });
  }
};
</script>
