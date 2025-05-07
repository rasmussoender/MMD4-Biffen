<script setup>
import { ref, onMounted } from 'vue';


const movies = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie');
    const data = await response.json();
    movies.value = data;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});
</script>

<template>
    <Header />

    <main class="movieContainer">
      <h1>Now Showing</h1>

      <div v-if="movies.length === 0">Loading film...</div>

      <section v-else class="movieCards">
        <article
          v-for="movie in movies"
          :key="movie.id"
          class="movieCard"
        >
          <router-link :to="`/film/${movie.slug}`">
            <img
              :src="movie.acf.poster.url"
              :alt="movie.title.rendered"
              class="movieImage"
            />
            <div class="movieDetails">
              <h2>{{ movie.title.rendered }}</h2>
              <div
                v-for="session in movie.acf.spilletider.filmvisning"
                :key="session.filmdato"
                class="movieSessions"
              >
                <h3>{{ session.filmdato }}</h3>
                <ul>
                  <li
                    v-for="time in session.spilletid"
                    :key="time.spilletidspunkt"
                  >
                    <router-link
                      :to="`/visning/${movie.slug}/${session.filmdato.replaceAll('/', '-')}/${time.spilletidspunkt.replace(':', '-')}`"
                    >
                      {{ time.spilletidspunkt }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </router-link>
        </article>
      </section>
    </main>
    <Footer />

</template>

<style scoped>

.movieCards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.movieCard {
  background: var(--secondary-blue);
  border: 1px solid #ddd;
  border-radius: var(--radius-card);
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.movieImage {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.movieDetails {
  margin-top: 15px;
}

.movieSessions {
  margin-top: 10px;
}

.movieSessions h3 {
  margin: 0;
}

.movieSessions ul {
  padding-left: 20px;
}
</style>
