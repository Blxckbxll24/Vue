<template>
  <nav class="bg-blue-600 text-white p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <a href="#" class="text-xl font-semibold">Mi Sitio</a>
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
      <ul :class="{'hidden': !isOpen, 'block': isOpen}" class="md:flex space-x-4 md:space-x-6">
        <li><a href="#" class="hover:text-gray-200">Inicio</a></li>
        <li><a href="/task" class="hover:text-gray-200">Notas</a></li>
        <li><a href="#" class="hover:text-gray-200">Contacto</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
