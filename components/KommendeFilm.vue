<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import gsap from 'gsap'

const { limit = null } = defineProps(['limit'])
const movies = ref([])

const isUpcoming = date => new Date(date) > new Date()
const formatDate = date =>
  new Date(date).toLocaleDateString('da-DK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

onMounted(async () => {
  try {
    const res = await fetch(
      'https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100'
    )
    const data = await res.json()
    movies.value = data
      .filter(m => isUpcoming(m.acf.udgivelsesdato))
      .sort(
        (a, b) =>
          new Date(a.acf.udgivelsesdato) - new Date(b.acf.udgivelsesdato)
      )

    await nextTick()
    gsap.from('.movieCard', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out'
    })
  } catch (err) {
    console.error('Fejl:', err)
  }
})

const displayedMovies = computed(() =>
  limit ? movies.value.slice(0, limit) : movies.value
)
</script>

<template>
  <div v-if="movies.length === 0">
    <i class="fa fa-spinner fa-spin"></i> Indlæser kommende film...
  </div>

  <div v-else class="movieCards widthContainer">
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

          <span class="upcomingTag"> Kommende </span>
        </div>
      </NuxtLink>
      <NuxtLink :to="`/film/${movie.slug}`" class="movieLink">
        <button class="ticketButton">
          <i class="fa-solid fa-ticket"></i> Bestil billetter
        </button>
      </NuxtLink>
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
