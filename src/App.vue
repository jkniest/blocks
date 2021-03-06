<template>
  <div class="flex flex-col min-h-screen">
    <div class="bg-indigo-100 px-4 py-6">
      <h1 class="text-3xl text-center uppercase">Comment Block Generator</h1>
    </div>

    <div class="container mx-auto mt-12">
      <block-generator/>
    </div>

    <div class="mt-auto h-10 bg-gray-100 flex items-center justify-center text-xs">
      Copyright &copy; Jordan Kniest
      &nbsp;–&nbsp;<a href="https://github.com/jkniest/blocks" class="text-blue-500 underline">Github</a>
      &nbsp;–&nbsp;<a href="https://twitter.com/j_kniest" class="text-blue-500 underline">Twitter</a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BlockGenerator from './components/BlockGenerator.vue';

export default defineComponent({
  components: {
    BlockGenerator
  }
})
</script>
