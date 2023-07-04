<script setup lang="ts">
import { ref } from 'vue';

import { BookmarkForm } from 'src/modules/bookmarks/presentation/components';

const name = ref('');

const url = ref('');
</script>

<template>
  <div class="q-pa-md">
    <bookmark-form
      v-model:name="name"
      v-model:url="url"
    />
  </div>
</template>
