<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';

import { useGetBookmarkByIdController, useUpdateBookmarkController } from 'src/modules/bookmarks/presentation/controllers';
import { BookmarkForm } from 'src/modules/bookmarks/presentation/components';

interface Props {
  bookmarkId: string;
}

const props = defineProps<Props>();

const { getBookmarkById, bookmark } = useGetBookmarkByIdController();

const { updateBookmark } = useUpdateBookmarkController();

const name = ref('');

const url = ref('');

watch(bookmark, (bookmark) => {
  if (bookmark) {
    name.value = bookmark.name;
    url.value = bookmark.url;
  }
});

const handleGetBookmarkById = async () => {
  await getBookmarkById(props.bookmarkId);
};

const handleBookmarkUpdate = async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await updateBookmark(props.bookmarkId, name.value, url.value, bookmark.value!.createdAt);
};

const handleReset = () => {
  if (bookmark.value) {
    name.value = bookmark.value.name;
    url.value = bookmark.value.url;
  }
};

onMounted(handleGetBookmarkById);
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
