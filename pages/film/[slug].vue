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
  <Header />
  <main v-if="movie" class="movieDetail">

    <div class="backButton">
        <NuxtLink to="/alle-film" class="btn back">
          <i class="fa fa-arrow-left"></i> Tilbage
        </NuxtLink>
      </div>
    
    <section class="heroWrapper" :style="{ backgroundImage: `url(${movie.acf.backgroundimage.url})` }">
      <div class="hero">
        <img :src="movie.acf.poster.url" :alt="movie.title.rendered" class="poster" />

        <div class="details">
          <div class="genre">
          <span v-for="(g, index) in movie.acf.genre" :key="index" class="genreItem">
            {{ g.filmgenre }}
          </span>
        </div>


          <h1>{{ movie.title.rendered }}</h1>

          <div class="meta">
            <span id="ratingStyle"><i class="fa-solid fa-star"></i> {{ movie.acf.rating }}/10</span>
            <span><i class="fa-solid fa-calendar-days"></i> {{ movie.acf.udgivelsesdato }}</span>
            <span><i class="fa-solid fa-clock"></i> {{ movie.acf.varighed }} t</span>
            <span v-if="movie.acf.age.length"><i class="fa-solid fa-user-shield"></i> {{ movie.acf.age[0].aldersgraense }}</span>
          </div>

          <p class="movieinstructor">Instruktør(ere): {{ movie.acf.movieinstructor.map(i => i.instructor).join(', ') }}</p>


          <p class="moviedescription">{{ movie.acf.description }}</p>
          <div class="buttons">
            <a :href="movie.acf.trailer" target="_blank" class="btn red">Se trailer</a>
            <a :href="movie.acf.imdb" target="_blank" class="btn outline">Læs mere</a>
          </div>
        </div>
      </div>
    </section>

    <section class="times">
      <div class="days">
        <div
          class="day"
          v-for="session in movie.acf.spilletider.filmvisning"
          :key="session.filmdato"
        >
          <h4>{{ session.filmdato }}</h4>
          <div class="slots">
            <router-link
              v-for="time in session.spilletid"
              :key="time.spilletidspunkt"
              class="time"
              :to="`/visning/${movie.slug}/${session.filmdato.replaceAll('/', '-')}/${time.spilletidspunkt.replace(':', '-')}`"
            >
              {{ time.spilletidspunkt }}
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div v-else>Loading movie details...</div>

  <Footer />
</template>

<style scoped>
.movieDetail {
  padding: 0;
}

.movieDetail p {
  font-size: 15px;
}

.heroWrapper {
  display: flex;
  flex-direction: column;
  height: 70vh;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  background-size: cover;
  background-position: center;
  padding-bottom: 2rem;
  padding: var(--space-container);
  border-radius: var(--radius-section);
  justify-content: center;
  align-items: center;
}

.hero {
  display: flex;
  gap: 7rem;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.poster {
  width: 40%;
  height: 90%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 2px #4C90FF;
  display: block;
}

.details {
  width: 60%;
  height: 90%;
  background: rgba(32, 47, 77, 0.8);
  padding: 2rem;
  padding-bottom: 0;
  padding-top: 0;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.details h1 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.genre {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
}

.genreItem {
  position: relative;
  padding: 0 0.5rem;
  font-weight: bold;
}

.genreItem:not(:last-child)::after {
  content: '|';
  position: absolute;
  right: -0.5rem;
  color: white;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.meta span {
  background: #181F2F;
  padding: 5px 8px;
  border-radius: var(--radius-button);
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta span i {
  color: var(--interactive-red);
}

#ratingStyle {
  background-color: rgba(234, 179, 5, 0.15);
}

#ratingStyle i {
  color: #EAB305;
}

.movieinstructor p {
  font-weight: bold;
}

.moviedescription {
  margin-top: 0;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn.red {
  background-color: #ff3b5c;
  color: white;
}

.btn.outline {
  border: 1px solid white;
  color: white;
  background: transparent;
}

.times {
  background: #16192e;
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.days {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  flex: 1;
  overflow-x: auto;
}

.slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time {
  background: #ff3b5c;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

</style>

