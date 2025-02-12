import { defineStore } from "pinia";
import {ref,computed, watch} from 'vue'
import type { Notes } from "@/interfaces/Types";

export const useNotesStore = defineStore('notes',() =>{
  const notes = ref<Notes[]>(JSON.parse(localStorage.getItem('notes') || '[]'))
  const loading = ref(false)
  const selectedTag = ref<string | null>(null);

  function addNotes(note: Omit<Notes, 'id' | 'createdAt'>) {
    if (!note.title || !note.description) return;

    const newNote: Notes = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    notes.value.push(newNote);

  }

  const sortedNotes = computed(() => {
    return [...notes.value].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  });

  function deleteAllNotes() {
    localStorage.removeItem('notes');
    notes.value = [];
  }

  const filteredNotes = computed(() => {
    if (!selectedTag.value) return sortedNotes.value;
    return sortedNotes.value.filter((note) => note.tags.includes(selectedTag.value!));
  });

  const notesByCategory = computed(() => {
    return notes.value.reduce((acc: Record<string, number>, note) => {
      note.tags.forEach((tag : string) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});
  });

  const totalNotes = computed(() => notes.value.length);

  watch(
    notes,
    (newNote) => {
      localStorage.setItem('notes', JSON.stringify(newNote))
    },
    { deep: true },
  )

  return {
    notes,
    loading,
    selectedTag,
    addNotes,
    sortedNotes,
    deleteAllNotes,
    filteredNotes,
    totalNotes,
    notesByCategory,
  }
})
