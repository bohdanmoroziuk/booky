<script setup lang="ts">
import { Bookmark } from 'src/modules/bookmarks/domain/entities';

interface Props {
  bookmark: Bookmark;
}

defineProps<Props>();
</script>

<template>
  <q-item class="q-pa-md">
    <q-item-section avatar top>
      <q-icon name="bookmark" color="primary" size="34px" />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        {{ bookmark.name }}
      </q-item-label>
      <a
        class="q-mt-xs text-body2 text-weight-bold text-primary"
        :href="bookmark.url"
        target="_blank"
      >
        {{ bookmark.url }}
      </a>
    </q-item-section>

    <q-item-section top side>
      <div class="q-gutter-xs">
        <q-btn size="md" color="positive" flat dense round icon="open_in_new" />
        <q-btn size="md" color="primary" flat dense round icon="edit" />
        <q-btn size="md" color="negative" flat dense round icon="delete" />
      </div>
    </q-item-section>
  </q-item>
</template>
