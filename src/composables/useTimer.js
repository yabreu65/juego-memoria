import { ref, computed, onUnmounted } from 'vue';

export function useTimer() {
  const startTime = ref(null);
  const elapsed = ref(0);
  const isRunning = ref(false);
  let intervalId = null;

  const formattedTime = computed(() => {
    const totalSeconds = Math.floor(elapsed.value / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => num.toString().padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  });

  const start = () => {
    if (!isRunning.value) {
      isRunning.value = true;
      startTime.value = Date.now() - elapsed.value;

      intervalId = setInterval(() => {
        if (isRunning.value) {
          elapsed.value = Date.now() - startTime.value;
        }
      }, 100);
    }
  };

  const pause = () => {
    isRunning.value = false;
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const reset = () => {
    pause();
    elapsed.value = 0;
    startTime.value = null;
  };

  const stop = () => {
    pause();
    const finalTime = elapsed.value;
    return finalTime;
  };

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  return {
    formattedTime,
    elapsed,
    isRunning,
    start,
    pause,
    reset,
    stop
  };
}
