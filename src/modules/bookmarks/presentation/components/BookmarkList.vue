<script setup lang="ts">
import { Bookmark } from 'src/modules/bookmarks/domain/entities';

import BookmarkListItem from 'src/modules/bookmarks/presentation/components/BookmarkListItem.vue';

interface Props {
  bookmarks: Bookmark[];
}

interface Emits {
  (event: 'delete-bookmark', payload: string): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const deleteBookmark = (id: string) => {
  emit('delete-bookmark', id);
};
</script>

<template>
  <q-list separator>
    <bookmark-list-item
      v-for="bookmark of bookmarks"
      :key="bookmark.id"
      :bookmark="bookmark"
      @delete="deleteBookmark(bookmark.id)"
    />
  </q-list>
</template>
