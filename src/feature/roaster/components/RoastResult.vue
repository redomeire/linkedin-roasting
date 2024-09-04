<template>
    <h3>Your result goes here</h3>
    <div v-if="props.resultText" class="result-board">
      {{ props.resultText.value }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps(['resultText'])
</script>
