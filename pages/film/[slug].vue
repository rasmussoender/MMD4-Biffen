<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const movie = ref(null);
const route = useRoute();
const slug = route.params.slug;

onMounted(async () => {
  try {
    const response = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?slug=${slug}`);
    const data = await response.json();
    movie.value = data[0]; 
  } catch (error) {
    console.error('Error fetching movie:', error);
  }
});
</script>

<template>
  <div v-if="movie">
    <h1>{{ movie.title.rendered }}</h1>
    <img :src="movie.acf.poster.url" :alt="movie.title.rendered" />
    <p>{{ movie.acf.description }}</p>
    <div v-for="session in movie.acf.spilletider.filmvisning" :key="session.filmdato">
      <h2>{{ session.filmdato }}</h2>
      <ul>
        <li v-for="time in session.spilletid" :key="time.spilletidspunkt">{{ time.spilletidspunkt }}</li>
      </ul>
    </div>
  </div>
  <div v-else>Loading movie details...</div>
</template>

<style scoped>
</style>
