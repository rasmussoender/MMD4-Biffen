<script setup>
import { ref, onMounted, computed } from 'vue';
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
    console.error('Der skete en fejl!', error);
  }
});

const visibleStart = ref(0);
const visibleCount = 7;

const nextDays = () => {
  if (movie.value) {
    const total = movie.value.acf.spilletider.filmvisning.length;
    if (visibleStart.value + visibleCount < total) {
      visibleStart.value += visibleCount;
    }
  }
};

const prevDays = () => {
  if (visibleStart.value - visibleCount >= 0) {
    visibleStart.value -= visibleCount;
  }
};

const visibleSessions = computed(() => {
  return movie.value?.acf.spilletider.filmvisning.slice(visibleStart.value, visibleStart.value + visibleCount) || [];
});

</script>

<template>
  <Header />
  <main v-if="movie" class="movieDetailsPage">
    <div class="backButton">
      <NuxtLink to="/alle-film" class="btn back">
        <i class="fa fa-arrow-left"></i> Tilbage
      </NuxtLink>
    </div>

    <section class="movieHeroWrapper" :style="{ backgroundImage: `url(${movie.acf.backgroundimage.url})` }">
      <div class="hero">
        <img :src="movie.acf.poster.url" :alt="movie.title.rendered" class="moviePoster" />

        <div class="movieInfoBox">
          <div class="genreTags">
            <span v-for="(g, index) in movie.acf.genre" :key="index" class="genreItem">
              {{ g.filmgenre }}
            </span>
          </div>

          <h1>{{ movie.title.rendered }}</h1>

          <div class="movieMetadata">
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

    <section class="showtimesSection">
      <div class="timesNav">
        <button @click="prevDays" :disabled="visibleStart === 0">
          <i class="fa-solid fa-caret-left"></i>
        </button>
      </div>

      <div class="days">
        <div class="showtimeDayCard" v-for="session in visibleSessions" :key="session.filmdato">
          <h4>{{ session.filmdato }}</h4>
          <div class="showtimeSlots">
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

      <div class="timesNav">
        <button @click="nextDays" :disabled="visibleStart + visibleCount >= movie.acf.spilletider.filmvisning.length">
          <i class="fa-solid fa-caret-right"></i>
        </button>
      </div>
    </section>

    <section class="actors">
      <h2>Top skuespillere</h2>
      <div class="actorSection">
        <div class="actorGroup" v-for="n in 6" :key="n">
          <img class="actorImg" src="/assets/img/Sauna-2025.hd (1).jpg" alt="">
          <h3 class="actorName">timotheeee</h3>
          <h4 class="actorRole">Lay</h4>
        </div>
      </div>
      <div class="actorbutton">
        <a :href="movie.acf.imdb" target="_blank" class="btn outline">Se alle skuespillere</a>
      </div>
    </section>
  </main>

  <div v-else>Loading movie details...</div>
  <Footer />
</template>


<style scoped>
.movieDetailsPage {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}

.movieDetailsPage p {
  font-size: 15px;
}

.movieHeroWrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
  background-size: cover;
  background-position: center;
  padding: var(--space-container);
  border-radius: var(--radius-section);
  justify-content: center;
  align-items: center;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.moviePoster {
  flex: 0 1 35%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: var(--radius-section);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.movieInfoBox {
  flex: 1 1 55%;
  background: rgba(32, 47, 77, 0.85);
  padding: 2rem;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
}

.movieInfoBox h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.genreTags {
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

.movieMetadata {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.movieMetadata span {
  background: #181F2F;
  padding: 5px 8px;
  border-radius: var(--radius-button);
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.movieMetadata span i {
  color: var(--interactive-red);
}

#ratingStyle {
  background-color: rgba(234, 179, 5, 0.15);
}

#ratingStyle i {
  color: #EAB305;
}

.movieinstructor {
  font-weight: bold;
  margin: 0.5rem 0;
}

.moviedescription {
  margin: 1rem 0;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
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

.showtimesSection {
  background: var(--secondary-blue);
  border-radius: 12px;
  padding: 1rem;
  margin: 3rem auto;
  overflow-x: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.days {
  display: flex;
  padding: 5rem;
  flex-wrap: nowrap;
  gap: 2rem;
  overflow-x: auto;
  justify-content: center;
}

.showtimeDayCard {
  background-color: var(--color-body);
  text-align: center;
  border-radius: var(--radius-button);

}

.showtimeSlots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.time {
  background: #ff3b5c;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-button);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
}

.timesNav {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.timesNav button {
  background: var(--interactive-red);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;
}

.timesNav button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.actors {
    padding: var(--space-container);
    padding-top: 0;
}

.actorSection {
 display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px; 
}

@media (max-width: 768px) {
  .actorSection {
    grid-template-columns: repeat(3, 1fr);
  }
}

.actorImg {
  width: 100%;     
  height: 70%;     
  object-fit: cover;  
  border-radius: 8px; 
}

.actorName, .actorRole {
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
}

.actorName {
  font-size: 16px;
  font-weight: bold;
}

.actorRole {
  font-size: 15px;
  font-weight: 200;
}

.actorbutton {
  margin-top: 1rem;
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
  gap: 1rem;
}


@media (min-width: 1200px) {
  .hero, .showtimesSection {
    max-width: 1200px;
  }
}

@media (min-width: 700px) {
  .movieInfoBox {
    max-width: 700px;
  }
}

@media (min-width: 400px) {
  .moviePoster {
    max-width: 400px;
  }
}
</style>
