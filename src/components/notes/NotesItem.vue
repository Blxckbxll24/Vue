<template>
  <CardBase class="p-4">
    <h3 class="text-lg font-semibold text-gray-900">{{ note.title }}</h3>
    <p class="text-gray-700 mt-2">{{ note.description }}</p>

    <div class="mt-3 flex flex-wrap gap-2">
      <span
        v-for="tag in note.tags"
        :key="tag"
        class="px-2 py-1 text-sm font-medium text-white rounded"
        :class="tagClasses[tag] || 'bg-gray-500'"
      >
        {{ tag }}
      </span>
    </div>

    <div class="flex justify-between items-center mt-4">
      <span class="text-sm text-gray-500">{{ formattedDate }}</span>
      <button
        @click="$emit('delete', note.id)"
        class="text-red-500 hover:underline"
      >
        Eliminar
      </button>
    </div>
  </CardBase>
</template>

<script setup lang="ts">
import CardBase from "@/components/common/Card.vue";
import type { Notes } from "@/interfaces/Types";
import { computed } from "vue";

const props = defineProps<{ note: Notes }>();

const formattedDate = computed(() =>
  new Date(props.note.createdAt).toLocaleDateString()
);


const tagClasses: Record<string, string> = {
  personal: "bg-blue-500",
  trabajo: "bg-green-500",
  urgente: "bg-orange-500",
};
</script>
