<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';
import { BookmarkForm } from 'src/modules/bookmarks/presentation/components';

interface Props {
  bookmarkId: string;
}

const props = defineProps<Props>();

const quasar = useQuasar();

const bookmarksStore = useBookmarksStore();

const { bookmark } = storeToRefs(bookmarksStore);

const name = ref('');

const url = ref('');

watch(bookmark, (bookmark) => {
  if (bookmark) {
    name.value = bookmark.name;
    url.value = bookmark.url;
  }
});

const handleBookmarkGetById = async () => {
  try {
    quasar.loading.show();

    await bookmarksStore.getBookmarkById(props.bookmarkId);
  } catch (error) {
    quasar.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    quasar.loading.hide();
  }
};

const handleBookmarkUpdate = async () => {
  try {
    quasar.loading.show();

    await bookmarksStore.updateBookmark(props.bookmarkId, name.value, url.value);
  } catch (error) {
    quasar.notify({ type: 'negative', message: (error as Error).message });
  } finally {
    quasar.loading.hide();
  }
};

const handleReset = () => {
  if (bookmark.value) {
    name.value = bookmark.value.name;
    url.value = bookmark.value.url;
  }
};

onMounted(handleBookmarkGetById);
</script>

<template>
  <div class="q-pa-md">
    <div v-if="bookmark">
      <bookmark-form
        v-model:name="name"
        v-model:url="url"
        @submit="handleBookmarkUpdate"
        @reset="handleReset"
      />
    </div>
    <div v-else>
      <div>Bookmark not found</div>
      <router-link :to="{ name: 'bookmarks' }">
        Back to home
      </router-link>
    </div>
  </div>
</template>
