<script setup lang="ts">
import { useVModel } from '@vueuse/core';

interface Props {
  name: string;
  url: string;
}

interface Emits {
  (event: 'update:name', payload: string): void;
  (event: 'update:url', payload: string): void;
  (event: 'reset'): void;
  (event: 'submit'): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const name = useVModel(props, 'name', emit);

const url = useVModel(props, 'url', emit);
</script>

<template>
  <q-form
    @submit.prevent="emit('submit')"
    @reset="emit('reset')"
    class="q-gutter-md"
  >
    <q-input
      v-model="name"
      label="Name *"
      dense
    />

    <q-input
      type="url"
      v-model="url"
      label="Url *"
      dense
    />

    <div>
      <q-btn label="Submit" type="submit" color="primary"/>
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>
