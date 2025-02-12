<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <header class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-2">Gestor de notas</h1>
    </header>

    <div v-if="notesStore.loading" class="text-center p-8">
      <div class="animate-spin inline-block w-8 h-8 border-2 border-current border-t-transparent rounded-full mb-4">
      </div>
      <p class="text-gray-600">Cargando notas...</p>
    </div>

    <template v-else>
      <div class="grid gap-6 md:grid-cols-3 ">
        <div
          class="md:col-span-1 bg-gradient-to-b from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-6 w-[500px] mr-5">
          <h2 class="text-2xl font-semibold mb-4 text-center">Nueva Nota</h2>
          <NotesForm @submit="handleNoteSubmit" />
        </div>
        <div
          class="md:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-h-[500px] overflow-y-auto ml-65">
          <h2 class="text-xl font-semibold mb-6">Notas</h2>
          <button @click="notesStore.deleteAllNotes()"
            class="bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition mb-10">
            Borrar todas las notas
          </button>

          <div class="p-4 bg-gray-100 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-gray-800">Resumen</h3>
            <p class="text-gray-700">Total de notas: {{ notesStore.totalNotes }}</p>
            <div v-for="(count, category) in notesStore.notesByCategory" :key="category">
              <p class="text-gray-700">{{ category }}: {{ count }}</p>
            </div>
          </div>
          <div class="mt-10 flex flex-col items-center">
            <div class="mb-6">
              <label for="filter" class="block text-gray-700 font-medium mb-2">Filtrar por categoría:</label>
              <select id="filter" v-model="notesStore.selectedTag"
                class="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option :value="null">Todas</option>
                <option value="urgente">🚨 Urgente</option>
                <option value="trabajo">💼 Trabajo</option>
                <option value="personal">🏡 Personal</option>
              </select>
            </div>
          </div>
          <div v-if="notesStore.notes.length > 0" class="space-y-4">
            <TransitionGroup name="list" tag="div" class="space-y-4">
              <NoteItem v-for="note in notesStore.filteredNotes" :key="note.id" :note="note" @delete="deleteNote" />
            </TransitionGroup>
          </div>
          <div v-else class="text-gray-600 text-center p-4">No hay notas disponibles.</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNotesStore } from "@/stores/notes";
import NotesForm from "@/components/notes/NotesForm.vue";
import NoteItem from "@/components/notes/NotesItem.vue";
import type { Notes } from "@/interfaces/Types";

const notesStore = useNotesStore();


function handleNoteSubmit(noteData: Omit<Notes, "id" | "createdAt">) {
  notesStore.addNotes(noteData);
}

function deleteNote(noteId: string) {
  const index = notesStore.notes.findIndex((n) => n.id === noteId);
  if (index !== -1) {
    notesStore.notes.splice(index, 1);
  }
}


function deleteAllNotes() {
  localStorage.removeItem('notes');
}


</script>
