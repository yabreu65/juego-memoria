<template>
  <div :class="skeletonClasses" role="status" aria-label="Cargando contenido">
    <span class="sr-only">Cargando...</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'card', 'circle', 'rectangle'].includes(value)
  },
  width: {
    type: String,
    default: 'full'
  },
  height: {
    type: String,
    default: 'auto'
  }
});

const skeletonClasses = computed(() => {
  const base = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700';

  const variants = {
    text: 'h-4 rounded',
    card: 'h-48 rounded-2xl',
    circle: 'rounded-full',
    rectangle: 'rounded-lg'
  };

  const widthClass = props.width === 'full' ? 'w-full' : props.width;
  const heightClass = props.height !== 'auto' ? props.height : '';

  return `${base} ${variants[props.variant]} ${widthClass} ${heightClass}`;
});
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
