<template>
  <div
    :class="cardClasses"
    role="region"
    :aria-label="ariaLabel"
  >
    <div v-if="$slots.header" class="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
      <slot name="header"></slot>
    </div>

    <div class="flex-1">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'elevated', 'outline'].includes(value)
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  ariaLabel: String
});

const cardClasses = computed(() => {
  const base = 'rounded-2xl transition-all duration-300';

  const variants = {
    default: 'bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700',
    elevated: 'bg-white dark:bg-slate-800 shadow-2xl hover:shadow-3xl',
    outline: 'bg-transparent border-2 border-slate-300 dark:border-slate-600 hover:border-primary'
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return `${base} ${variants[props.variant]} ${paddings[props.padding]}`;
});
</script>
