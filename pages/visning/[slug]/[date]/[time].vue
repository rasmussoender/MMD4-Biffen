<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import Header from '@/components/Header.vue';


const { slug, date, time } = useRoute().params;
const visning = ref(null);

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie');
    const movies = await res.json();

    const movie = movies.find(m => m.slug === slug);
    const session = movie?.acf?.spilletider?.filmvisning?.find(s =>
      s.filmdato.replaceAll('/', '-') === date
    );
    const timeSlot = session?.spilletid?.find(t =>
      t.spilletidspunkt.replace(':', '-') === time
    );

    if (movie && session && timeSlot) {
      visning.value = {
        title: movie.title.rendered,
        date: session.filmdato,
        time: timeSlot.spilletidspunkt,
        posterUrl: movie.acf.poster.url,  
      };
    }
  } catch (e) {
    console.error('Fejl ved hentning:', e);
  }
});
</script>

<template>
    <Header />
    <main>
      <div v-if="visning">
        <h1>{{ visning.title }}</h1>
        <p>Dato: {{ visning.date }}</p>
        <p>Spilletidspunkt: {{ visning.time }}</p>
        <img v-if="visning.posterUrl" :src="visning.posterUrl" :alt="visning.title" />
      </div>
      <div v-else>
        <p>Film ikke fundet</p>
      </div>
    </main>
    <Footer />

  </template>
