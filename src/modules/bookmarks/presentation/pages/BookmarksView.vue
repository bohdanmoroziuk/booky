<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

import BookmarkList from 'src/modules/bookmarks/presentation/components/BookmarkList.vue';

const quasar = useQuasar();

const bookmarksStore = useBookmarksStore();

const { bookmarks } = storeToRefs(bookmarksStore);

const sleep = (delay: number) => new Promise((resolve) => {
  setTimeout(resolve, delay);
});

const handleBookmarksGet = async () => {
  try {
    quasar.loading.show();

    await sleep(500);
    await bookmarksStore.getBookmarks();
  } catch (error) {
    quasar.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    quasar.loading.hide();
  }
};

onMounted(handleBookmarksGet);
</script>

<template>
  <div>
    <div class="q-pa-md">
      <div class="flex items-center q-gutter-sm">
        <q-btn
          color="primary"
          icon="refresh"
          unelevated
          @click="handleBookmarksGet"
        />
        <q-btn
          color="primary"
          icon="add"
          unelevated
          :to="{ name: 'create-bookmark' }"
        />
      </div>
    </div>
    <q-separator />
    <bookmark-list :bookmarks="bookmarks" />
  </div>
</template>
