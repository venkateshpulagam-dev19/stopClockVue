<template>
    <div class="stop-clock">
      <h1>Stop Clock</h1>
      <div class="display">{{ formattedTime }}</div>
      <div class="controls">
        <button @click="start">Start</button>
        <button @click="stop">Stop</button>
        <button @click="reset">Reset</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  
  // Reactive state variables
  const time = ref<number>(0);
  const intervalId = ref<number | null>(null);
  
  // Computed property to format the time as mm:ss:cs
  const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 6000);
    const seconds = Math.floor((time.value % 6000) / 100);
    const centiseconds = time.value % 100;
  
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(centiseconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
  });
  
  // Start the clock
  const start = () => {
    if (intervalId.value === null) {
      intervalId.value = window.setInterval(() => {
        time.value += 1;
      }, 10); // 10ms interval for 1/100th of a second accuracy
    }
  };
  
  // Stop the clock
  const stop = () => {
    if (intervalId.value !== null) {
      clearInterval(intervalId.value);
      intervalId.value = null;
    }
  };
  
  // Reset the clock
  const reset = () => {
    stop();
    time.value = 0;
  };
  </script>
  
  <style scoped>
  .stop-clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
  }
  
  .display {
    font-size: 48px;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
  }
  
  .controls button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .controls button:hover {
    background-color: #358e6c;
  }
  </style>