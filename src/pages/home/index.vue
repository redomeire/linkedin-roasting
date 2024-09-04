<script setup>
import RoastForm from '../../feature/roaster/components/RoastForm.vue'
import RoastResult from '../../feature/roaster/components/RoastResult.vue'
import { ref, reactive } from 'vue'

const username = ref('')
const resultText = ref('')
</script>

<template>
  <main>
    <RoastForm 
      v-model:username="username"
      :result-text="resultText"
    />
    <RoastResult :result-text="resultText" />
  </main>
</template>

