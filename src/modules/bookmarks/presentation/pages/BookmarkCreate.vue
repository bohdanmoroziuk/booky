<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';
import { BookmarkForm } from 'src/modules/bookmarks/presentation/components';

const quasar = useQuasar();

const router = useRouter();

const bookmarksStore = useBookmarksStore();

const name = ref('');

const url = ref('');

const handleReset = () => {
  name.value = '';
  url.value = '';
};

const handleBookmarkCreate = async () => {
  try {
    quasar.loading.show();

    await bookmarksStore.createBookmark(name.value, url.value);

    await router.push({ name: 'bookmarks' });
  } catch (error) {
    quasar.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    quasar.loading.hide();
  }
};
</script>

<template>
  <div class="q-pa-md">
    <bookmark-form
      v-model:name="name"
      v-model:url="url"
      @submit="handleBookmarkCreate"
      @reset="handleReset"
    />
  </div>
</template>
