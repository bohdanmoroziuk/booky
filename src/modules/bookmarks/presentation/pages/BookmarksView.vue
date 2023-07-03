<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

import BookmarkList from 'src/modules/bookmarks/presentation/components/BookmarkList.vue';

const bookmarksStore = useBookmarksStore();

const { bookmarks } = storeToRefs(bookmarksStore);

onMounted(async () => {
  await bookmarksStore.getBookmarks();
});
</script>

<template>
  <div>
    <bookmark-list :bookmarks="bookmarks" />
  </div>
</template>
