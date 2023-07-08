<script setup lang="ts">
import { toDisplayDate } from 'src/shared/utils';

import { Bookmark } from 'src/modules/bookmarks/domain/entities';

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
      <q-icon name="bookmark" color="primary" size="34px" />
    </q-item-section>

    <q-item-section top>
      <h5 class="q-ma-none q-mb-sm">
        {{ bookmark.name }}
      </h5>
      <div class="flex items-center">
        <a
          class="text-body2 text-weight-bold text-primary"
          :href="bookmark.url"
          target="_blank"
        >
          {{ bookmark.url }}
        </a>
        <div class="dot bg-grey q-mx-sm" />
        <span class="text-grey">
          {{ toDisplayDate(bookmark.createdAt) }}
        </span>
      </div>
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
