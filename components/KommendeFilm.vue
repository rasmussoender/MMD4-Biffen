<script setup>
// Tager brug af gsap library: https://gsap.com/
import { computed, nextTick, onMounted } from 'vue'
import { useFetch } from '#app'
import gsap from 'gsap'

// Her fetches data fra wordpress api, ved hjælp af useFetch. 
// Her defineres pending og error, altså hvis der skulle ske en fejl kommer der besked, samt når den loader
const { data: movies, error, pending } = useFetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100')

// Tjekker om datoen er i fremtiden, hvis ja får den "kommende" tag
const isUpcoming = date => new Date(date) > new Date()
const formatDate = date =>
// Formaterer dato
  new Date(date).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

// Sortering af kommende film, sorterert fra tidligst til seneste
// Laver variabel som bruger computed
const filteredMovies = computed(() => {
  // Hvis der ikke er nogle film, retunerer den en tom liste
  if (!movies.value) return []
  // Den vælger kun de film som kommer i fremtiden
  // Så sorterer vi  kommende film efter deres udgivelsesdato
  // Film med den tidligste dato kommer først
  return movies.value
    .filter(m => isUpcoming(m.acf.udgivelsesdato))
    .sort((a, b) => new Date(a.acf.udgivelsesdato) - new Date(b.acf.udgivelsesdato))
})

// Gsap animation, bruger onMOunted, som kører koden når at den er klar til at blive vist
// Await, nexttick venter på at dom'en er færdig med at køre
onMounted(async () => {
  await nextTick();
  gsap.from('.movieCard', {
    // Herinde kan vi definere vores animation, og hvordan det skal opføre sig
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// For at genbruge dette komponent på både forside og kommende film side, definerer vi props, så vi kan nøjes med at render 4 på forsiden

// Her modtager komponenten en prop kaldet limit
//  Hvis ingen limit bliver givet, er den null er derfor ingen grænse
const { limit = null } = defineProps(['limit'])
// Hvis limit definereres, tager den kun de første film fra filteredMovies. Hvis ikke, viser den alle film.
const displayedMovies = computed(() =>
  limit ? filteredMovies.value.slice(0, limit) : filteredMovies.value
)
</script>

<template>
  <div>
    <div v-if="pending">
      <i class="fa fa-spinner fa-spin"></i> Indlæser kommende film...
    </div>

    <div v-else-if="error">
      Der opstod en fejl
    </div>

    <div v-else-if="displayedMovies.length" class="movieCards widthContainer">
      <div v-for="movie in displayedMovies" :key="movie.id" class="movieCard">
        <NuxtLink :to="`/film/${movie.slug}`" class="movieLink">
          <div class="moviePosterWrapper imageHoverEffect">
            <img
              :src="movie.acf.poster.url"
              :alt="movie.title.rendered"
              class="movieImage"
            />
            <div class="movieOverlay"></div>
            <div class="movieTitleOverlay">{{ movie.title.rendered }}</div>

            <span class="movieDate">
              <i class="fa-solid fa-film"></i>
              {{ formatDate(movie.acf.udgivelsesdato) }}
            </span>

            <span class="upcomingTag">Kommende</span>
          </div>
        </NuxtLink>
        <NuxtLink :to="`/film/${movie.slug}`" class="movieLink">
          <button class="ticketButton">
            <i class="fa-solid fa-ticket"></i> Bestil billetter
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-else>
      Ingen kommende film fundet.
    </div>
  </div>
</template>


<style scoped>
.movieCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 30px;
  row-gap: 50px;
  margin-top: 30px;
  padding-bottom: 3rem;
}

.movieCard {
  border-radius: var(--radius-card);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieLink {
  text-decoration: none;
  color: inherit;
}

.moviePosterWrapper {
  position: relative;
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
}

.movieImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.movieOverlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at bottom,
    rgba(24, 31, 47, 1),
    transparent 100%
  );
  z-index: 1;
}

.movieTitleOverlay {
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  z-index: 1;
}

.upcomingTag {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ef4565;
  color: white;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: var(--radius-button);
  z-index: 2;
}

.movieDate {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(24, 31, 47, 0.8);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 2;
}

.movieDate i {
  color: var(--interactive-red);
}

.ticketButton {
  background: var(--interactive-red);
  color: white;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-button);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: auto;
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  transition: background 0.3s;
}

.ticketButton:hover {
  background: #e11d48;
}
</style>
