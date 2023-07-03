<script setup lang="ts">
import { Bookmark } from 'src/modules/bookmarks/domain/entities';

import BookmarkListItem from 'src/modules/bookmarks/presentation/components/BookmarkListItem.vue';

interface Props {
  bookmarks: Bookmark[];
}

defineProps<Props>();
</script>

<template>
  <q-list separator>
    <bookmark-list-item
      v-for="bookmark of bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
    />
  </q-list>
</template>
