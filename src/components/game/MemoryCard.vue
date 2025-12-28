<template>
  <div
    class="cursor-pointer"
    @click="handleClick"
    :aria-label="`Tarjeta ${index + 1}${isFlipped ? ': ' + pokemon.name : ''}`"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div
      :class="cardClasses"
      :style="cardStyle"
    >
      <!-- Show Back when NOT flipped -->
      <div
        v-show="!isFlipped && !isMatched"
        :style="cardStyle"
        class="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl flex items-center justify-center border-2 border-slate-600 dark:border-slate-700"
      >
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 font-semibold">?</p>
        </div>
      </div>

      <!-- Show Front when flipped or matched -->
      <div
        v-show="isFlipped || isMatched"
        :style="cardStyle"
        class="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl flex items-center justify-center p-4"
      >
        <img
          v-if="pokemon.image"
          :src="pokemon.image"
          :alt="pokemon.name"
          class="w-full h-full object-contain drop-shadow-2xl"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  pokemon: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  isFlipped: {
    type: Boolean,
    default: false
  },
  isMatched: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
});

const emit = defineEmits(['flip']);

const handleClick = () => {
  if (!props.isFlipped && !props.isMatched) {
    emit('flip', props.index);
  }
};

const cardStyle = computed(() => {
  const sizes = {
    sm: { width: '100px', height: '100px' },
    md: { width: '140px', height: '140px' },
    lg: { width: '180px', height: '180px' }
  };
  return sizes[props.size];
});

const cardClasses = computed(() => {
  const base = 'relative transition-all duration-300 ease-out';
  const matched = props.isMatched ? 'opacity-60 scale-95' : '';
  const interactive = !props.isFlipped && !props.isMatched ? 'hover:shadow-2xl active:scale-95' : '';

  return `${base} ${matched} ${interactive}`;
});
</script>

<style scoped>
/* Removed complex 3D transforms - using simple v-show instead */
</style>
