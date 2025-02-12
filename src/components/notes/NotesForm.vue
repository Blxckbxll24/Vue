<template>
  <div class="mt-10 flex justify-center">
    <div class="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Escribe tu nota</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2">Título</label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            class="w-full p-3 border rounded-lg text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-0"
            placeholder="Escribe el título"
            required
          />
        </div>
        <div>
          <label for="description" class="block text-gray-700 font-medium mb-2">Contenido</label>
          <textarea
            v-model="form.description"
            id="description"
            rows="4"
            class="w-full p-3 border rounded-lg shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition border-0"
            placeholder="Escribe el contenido"
            required
          ></textarea>
        </div>
        <div>
          <label for="tags" class="block text-gray-700 font-medium mb-2">Categoría</label>
          <select
            v-model="form.tags"
            multiple
            id="tags"
            class="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition"
          >
            <option value="urgente" class="text-black">🚨 Urgente</option>
            <option value="trabajo" class="text-black">💼 Trabajo</option>
            <option value="personal" class="text-black">🏡 Personal</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();

const initialForm = {
  title: '',
  description: '',
  tags: [] as string[],
};

const form = reactive({ ...initialForm });

const handleSubmit = (event: Event) => {
  event.preventDefault();

  if (!form.title.trim() || !form.description.trim()) return;

  notesStore.addNotes({
    title: form.title.trim(),
    description: form.description.trim(),
    tags: [...form.tags],
  });

  resetForm();
};

const resetForm = () => {
  form.title = '';
  form.description = '';
  form.tags = [];
};
</script>
