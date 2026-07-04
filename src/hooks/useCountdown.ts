import { computed, onUnmounted, ref } from 'vue';

export function useCountdown(initialSeconds: number = 60) {
  const timeLeft = ref<number>(0);

  let timerId: ReturnType<typeof setInterval> | null = null;

  const isCounting = computed(() => timeLeft.value > 0);

  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  const stop = () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const start = () => {
    if (isCounting.value) return;

    timeLeft.value = initialSeconds;

    timerId = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1;
      } else {
        stop();
      }
    }, 1000);
  };

  onUnmounted(() => {
    stop();
  });

  return {
    timeLeft,
    isCounting,
    formattedTime,
    start,
    stop
  };
}
