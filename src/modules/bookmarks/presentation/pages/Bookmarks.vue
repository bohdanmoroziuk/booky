<script setup lang="ts">
import { onMounted } from 'vue';

import {
  useGetBookmarksController,
  useDeleteBookmarkController,
  useOpenBookmarkUrlController,
} from 'src/modules/bookmarks/presentation/controllers';

import { BookmarkList } from 'src/modules/bookmarks/presentation/components';

const { getBookmarks, bookmarks } = useGetBookmarksController();

const { deleteBookmark } = useDeleteBookmarkController();

const { openBookmarkUrl } = useOpenBookmarkUrlController();

onMounted(getBookmarks);
</script>

<template>
  <div>
    <div class="q-pa-md">
      <div class="flex items-center q-gutter-sm">
        <q-btn
          color="primary"
          icon="refresh"
          unelevated
          @click="getBookmarks"
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
    <bookmark-list
      :bookmarks="bookmarks"
      @delete-bookmark="deleteBookmark"
      @open-bookmark-url="openBookmarkUrl"
    />
  </div>
</template>
