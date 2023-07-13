<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  url: string;
}

const props = defineProps<Props>();

const label = computed(() => new URL(props.url).hostname);
</script>

<template>
  <a
    class="text-body2 text-weight-bold text-primary"
    :href="url"
    target="_blank"
  >
    {{ label }}
  </a>
</template>
