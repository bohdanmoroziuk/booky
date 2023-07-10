<script setup lang="ts">
import { useCreateBookmarkController } from 'src/modules/bookmarks/presentation/controllers';
import { BookmarkForm } from 'src/modules/bookmarks/presentation/components';

const {
  createBookmark,
  reset,
  name,
  url,
} = useCreateBookmarkController();
</script>

<template>
  <div class="q-pa-md">
    <bookmark-form
      v-model:name="name"
      v-model:url="url"
      @submit="createBookmark"
      @reset="reset"
    />
  </div>
</template>
