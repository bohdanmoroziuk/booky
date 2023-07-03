<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

const bookmarksStore = useBookmarksStore();

const { totalBookmarks } = storeToRefs(bookmarksStore);

onMounted(async () => {
  await bookmarksStore.getBookmarks();
});
</script>

<template>
  <div class="q-pa-md">
    Total bookmarks: {{ totalBookmarks }}
  </div>
</template>
