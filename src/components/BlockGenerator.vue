<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
    <div class="text-center">
      <strong class="tracking-wider block">Options</strong>

      <div class="w-full text-left mt-8 grid grid-cols-3 gap-4">
        <div>
          <label for="edgeCharacter" class="block">Edge-Character</label>
          <input type="text" id="edgeCharacter" class="w-full" maxlength="1" v-model="edgeCharacter">
        </div>
        <div>
          <label for="centerCharacters" class="block">Center-Character</label>
          <input type="text" id="centerCharacters" class="w-full" maxlength="1" v-model="centerCharacter">
        </div>
        <div>
          <label for="sideCharacter" class="block">Side-Character</label>
          <input type="text" id="sideCharacter" class="w-full" maxlength="1" v-model="sideCharacter">
        </div>
      </div>

      <div class="w-full text-left mt-8">
        <label for="length" class="block">Length</label>
        <input type="number" id="length" class="w-full" v-model="length">
      </div>

      <div class="w-full text-left mt-8">
        <label for="padding" class="block">Padding</label>
        <input type="number" id="padding" class="w-full" v-model="padding">
      </div>

      <div class="w-full text-left mt-8">
        <label for="content" class="block">Content</label>
        <textarea class="w-full h-20" v-model="content"></textarea>
      </div>
    </div>
    <div class="text-center flex flex-col">
      <strong class="tracking-wider block">Result</strong>
      <textarea v-model="result" ref="contentTextarea" readonly
                class="font-code bg-gray-100 w-full h-64 md:flex-1  mt-14"></textarea>
    </div>
  </div>
  <div class="w-full text-sm pr-5 flex items-center justify-end">
    <transition
        enter-active-class="transition-all ease-out-quad"
        leave-active-class="transition-all ease-in-quad"
        enter-from-class="opacity-0 scale-70"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-70"
    >
      <p class="mr-3 transition" v-show="copied">Copied.</p>
    </transition>
    <a href="#" class="underline text-blue-600" @click.prevent="copy">Copy</a>
  </div>
</template>

<script lang="ts">
import {computed, ref, defineComponent} from 'vue'

export default defineComponent({
  setup() {
    const edgeCharacter = ref('#');
    const sideCharacter = ref('#');
    const centerCharacter = ref('#');

    const length = ref(32);
    const padding = ref(1);
    const content = ref('Example content');
    const copied = ref(false);

    const contentTextarea = ref<HTMLTextAreaElement | null>(null);

    const fullLine = (l: number) => {
      return edgeCharacter.value + centerCharacter.value.repeat(l-2) + edgeCharacter.value + "\n";
    };

    const paddingLines = (l: number) => {
      return (sideCharacter.value + ' '.repeat(l - 2) + sideCharacter.value + "\n").repeat(padding.value);
    };

    const contentLine = (l: number, line: string) => {
      const spaces = Math.max(((l - 2 - line.length) / 2), 0);
      const spaceLeft = spaces;
      const spaceRight = (spaces % 1 !== 0) ? spaces + 1 : spaces;

      return sideCharacter.value + ' '.repeat(spaceLeft) + line + ' '.repeat(spaceRight) + sideCharacter.value + "\n";
    }

    const result = computed(() => {
      const lines = content.value.split("\n");

      let maxLength = 0;
      lines.forEach((line) => maxLength = Math.max(maxLength, line.length));

      const l = Math.max(length.value, maxLength + 2);

      let comment = fullLine(l);
      comment += paddingLines(l);

      lines.forEach(line => {
        comment += contentLine(l, line);
      });

      comment += paddingLines(l);
      comment += fullLine(l);

      return comment;
    });

    const copy = () => {
      contentTextarea.value?.select();
      contentTextarea.value?.setSelectionRange(0, 999999);
      document.execCommand('copy');

      copied.value = true;
      setTimeout(() => copied.value = false, 1000);
    };

    return {
      result,
      edgeCharacter,
      sideCharacter,
      centerCharacter,
      length,
      padding,
      content,
      copy,
      contentTextarea,
      copied
    };
  }
});
</script>
