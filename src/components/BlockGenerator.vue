<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
        <div class="text-center">
            <strong class="tracking-wider block">Options</strong>

            <div class="w-full text-left mt-8 grid grid-cols-3 gap-4">
                <div>
                    <label for="edgeCharacter" class="block">Edge characters</label>
                    <input type="text" id="edgeCharacter" class="w-full" v-model="edgeCharacters">
                </div>
                <div>
                    <label for="centerCharacters" class="block">Center character</label>
                    <input type="text" id="centerCharacters" class="w-full" maxlength="1" v-model="centerCharacter">
                </div>
                <div>
                    <label for="sideCharacter" class="block">Side character</label>
                    <input type="text" id="sideCharacter" class="w-full" v-model="sideCharacters">
                </div>
            </div>

            <div class="w-full text-left grid grid-cols-2 gap-4">
                <div class="w-full text-left mt-8">
                    <label for="length" class="block">Length</label>
                    <input type="number" id="length" class="w-full" v-model="length">
                </div>

                <div class="w-full text-left mt-8">
                    <label for="padding" class="block">Padding</label>
                    <input type="number" id="padding" class="w-full" v-model="padding">
                </div>
            </div>

            <div class="w-full text-left mt-8">
                <label for="content" class="block">Content</label>
                <textarea id="content" class="w-full h-20" v-model="content"></textarea>
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

<script setup lang="ts">
    import {computed, ref} from 'vue'

    // Data
    const edgeCharacters = ref('#');
    const sideCharacters = ref('||');
    const centerCharacter = ref('#');

    const length = ref(32);
    const padding = ref(1);
    const content = ref('Example content');
    const copied = ref(false);

    const contentTextarea = ref<HTMLTextAreaElement | null>(null);

    // Computed
    const result = computed(() => {
        const lines = content.value.split("\n");

        let maxLength = 0;
        lines.forEach((line) => maxLength = Math.max(maxLength, line.length));

        const l = Math.max(length.value, maxLength + sideCharacters.value.length * 2);

        let comment = fullLine(l);
        comment += paddingLines(l);

        lines.forEach(line => {
            comment += contentLine(l, line);
        });

        comment += paddingLines(l);
        comment += fullLine(l);

        return comment;
    });

    // Methods
    const fullLine = (l: number) => {
        let line = edgeCharacters.value;
        line += centerCharacter.value.repeat(
            (l - edgeCharacters.value.length * 2)
        );
        line += edgeCharacters.value + "\n";

        return line;
    };

    const paddingLines = (l: number) => {
        let line = sideCharacters.value;
        line += ' '.repeat(l - sideCharacters.value.length * 2);
        line += sideCharacters.value;
        line += "\n";

        return line.repeat(padding.value);
    };

    const contentLine = (l: number, line: string) => {
        const spaces = Math.max(((l - (sideCharacters.value.length * 2) - line.length) / 2), 0);
        const spaceLeft = spaces;
        const spaceRight = (spaces % 1 !== 0) ? spaces + 1 : spaces;

        return sideCharacters.value + ' '.repeat(spaceLeft) + line + ' '.repeat(spaceRight) + sideCharacters.value + "\n";
    }

    const copy = () => {
        contentTextarea.value?.select();
        contentTextarea.value?.setSelectionRange(0, 999999);
        document.execCommand('copy');

        copied.value = true;
        setTimeout(() => copied.value = false, 1000);
    };
</script>
