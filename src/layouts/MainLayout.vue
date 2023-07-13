<template>
  <q-layout view="lHh lpr lFf">

    <q-header class="bg-white text-black" bordered>
      <q-toolbar>
        <q-icon name="bookmarks" color="primary" size="md" />
        <q-toolbar-title>
          Booky
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
