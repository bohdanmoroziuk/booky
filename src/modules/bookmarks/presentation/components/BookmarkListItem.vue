<script setup lang="ts">
import { toDisplayDate } from 'src/shared/utils';

import { Bookmark } from 'src/modules/bookmarks/domain';

import BookmarkListItemUrl from 'src/modules/bookmarks/presentation/components/BookmarkListItemUrl.vue';

interface Props {
  bookmark: Bookmark;
}

interface Emits {
  (event: 'delete'): void;
  (event: 'open-url'): void;
}

defineProps<Props>();

const emit = defineEmits<Emits>();

const deleteBookmark = () => {
  emit('delete');
};

const openBookmarkUrl = () => {
  emit('open-url');
};
</script>

<template>
  <q-item class="q-pa-md">
    <q-item-section avatar top>
      <q-icon name="bookmark" color="primary" size="sm" />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <h6 class="q-ma-none text-weight-regular">
          {{ bookmark.name }}
        </h6>
      </q-item-label>
      <q-item-label lines="1">
        <div class="flex-inline items-center">
          <bookmark-list-item-url :url="bookmark.url" />
          <div class="dot inline-block bg-grey q-mx-sm" />
          <span class="text-grey">
            {{ toDisplayDate(bookmark.createdAt) }}
          </span>
        </div>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="q-gutter-xs">
        <q-btn
          size="md"
          color="positive"
          icon="open_in_new"
          flat
          dense
          round
          @click="openBookmarkUrl"
        />
        <q-btn
          size="md"
          color="primary"
          icon="edit"
          flat
          dense
          round
          :to="{ name: 'update-bookmark', params: { bookmarkId: bookmark.id } }"
        />
        <q-btn
          size="md"
          color="negative"
          icon="delete"
          flat
          dense
          round
          @click.stop="deleteBookmark"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}
</style>
