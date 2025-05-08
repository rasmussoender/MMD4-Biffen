<script setup>
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from 'vue'

const movies = ref([
  {
    id: 1,
    title: 'Sing Sing',
    genre: 'Drama | Fængsel',
    rating: '7.4/10',
    release_date: '18 dec. 2024',
    duration: '2:36',
    age_rating: '7 år+',
    description: `Divine G sidder fængslet i Sing Sing for en forbrydelse, han ikke har begået, men finder mening i livet gennem en teatergruppe.`,
    background_image: new URL('@/assets/img/sing-sing-banner.png', import.meta.url).href
  },
  {
    id: 2,
    title: 'The Last Light',
    genre: 'Drama | Sci-fi',
    rating: '7.9/10',
    release_date: '15 okt. 2025',
    duration: '2:15',
    age_rating: '11 år+',
    description: `I en fremtid hvor solen er ved at dø ud, kæmper menneskeheden for at overleve i evigt mørke.`,
    background_image: new URL('@/assets/img/dylan-banner.png', import.meta.url).href
  },
  {
    id: 3,
    title: 'Ocean Depths',
    genre: 'Dokumentar | Natur',
    rating: '9.0/10',
    release_date: '1 jun. 2025',
    duration: '1:30',
    age_rating: 'Tilladt for alle',
    description: `Udforsk havets mysterier i denne visuelt betagende dokumentar.`,
    background_image: new URL('@/assets/img/queer-banner.png', import.meta.url).href
  },
  {
    id: 4,
    title: 'The Painter',
    genre: 'Drama | Kunst',
    rating: '8.5/10',
    release_date: '21 apr. 2025',
    duration: '2:20',
    age_rating: '7 år+',
    description: `En kunstners liv bliver vendt på hovedet...`,
    background_image: new URL('@/assets/img/seebach-banner.jpg', import.meta.url).href
  },
  {
    id: 5,
    title: 'Jungle Strike',
    genre: 'Action | Thriller',
    rating: '7.8/10',
    release_date: '7 mar. 2025',
    duration: '2:00',
    age_rating: '15 år+',
    description: `En elitesoldat sendes på mission...`,
    background_image: new URL('@/assets/img/sauna-hero.png', import.meta.url).href
  },
  {
    id: 6,
    title: 'Love in Winter',
    genre: 'Romantik | Drama',
    rating: '6.9/10',
    release_date: '14 feb. 2025',
    duration: '1:45',
    age_rating: 'Tilladt for alle',
    description: `To mennesker mødes i en snedækket by og opdager, at kærlighed kan opstå selv i de koldeste tider.`,
    background_image: new URL('@/assets/img/buster-banner.png', import.meta.url).href
  }
])

const currentIndex = ref(0)
const previousIndex = ref(null)
const expanded = ref(false)
const showReadMore = ref(false)
const descriptionEl = ref(null)
const isFading = ref(false)
const hasMounted = ref(false)
let intervalId = null

const fadeDuration = 1000

const nextMovie = async () => {
  previousIndex.value = currentIndex.value
  isFading.value = true

  await nextTick()

  currentIndex.value = (currentIndex.value + 1) % movies.value.length
  expanded.value = false
  await nextTick()
  checkIfOverflowing()

  setTimeout(() => {
    previousIndex.value = null
    isFading.value = false
  }, fadeDuration)
}

const checkIfOverflowing = () => {
  const el = descriptionEl.value
  if (!el) return

  const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
  const maxHeight = lineHeight * 3
  showReadMore.value = el.scrollHeight > (maxHeight + 5)

  el.style.display = 'none'
  setTimeout(() => {
    if (el) el.style.display = ''
  }, 0)
}

onMounted(async () => {
  await nextTick()
  checkIfOverflowing()
  hasMounted.value = true
  intervalId = setInterval(nextMovie, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

watchEffect(async () => {
  await nextTick()
  checkIfOverflowing()
})

const toggleDescription = () => {
  expanded.value = !expanded.value
}
</script>

<template>
  <section class="hero">
    <!-- Previous background fading out -->
    <div
      v-if="previousIndex !== null"
      class="background-layer fade-out"
      :style="{ backgroundImage: `url(${movies[previousIndex].background_image})` }"
    ></div>

    <!-- Current background -->
    <div
      class="background-layer"
      :class="{ 'fade-in': isFading }"
      :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"
    ></div>

    <!-- Initial background without transition -->
    <div
      v-if="!hasMounted"
      class="background-layer"
      :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"
    ></div>

    <!-- Overlay -->
    <div class="overlay">
      <div class="info">
        <p class="genre">{{ movies[currentIndex].genre }}</p>
        <h1 class="title">{{ movies[currentIndex].title }}</h1>
        <ul class="details">
          <li>⭐ {{ movies[currentIndex].rating }}</li>
          <li>📅 {{ movies[currentIndex].release_date }}</li>
          <li>⏱️ {{ movies[currentIndex].duration }}</li>
          <li>🔞 {{ movies[currentIndex].age_rating }}</li>
        </ul>

        <div class="description-container">
          <p
            ref="descriptionEl"
            class="description"
            :class="{ collapsed: !expanded }"
          >
            {{ movies[currentIndex].description }}
          </p>
          <div v-if="showReadMore && !expanded" class="read-more-container">
            <a href="#" class="read-more" @click.prevent="toggleDescription">Read more</a>
          </div>
          <div v-if="expanded" class="read-more-container">
            <a href="#" class="read-more" @click.prevent="toggleDescription">Show less</a>
          </div>
        </div>

        <div class="buttons">
          <button class="primary">🎟️ Bestil billetter</button>
          <button class="secondary">▶️ Se trailer</button>
        </div>
      </div>

      <div class="slider-dots">
        <span
          v-for="(movie, index) in movies"
          :key="movie.id"
          :class="{ dot: true, active: index === currentIndex }"
        ></span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: white;
}

.background-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1s ease-in-out;
  opacity: 1;
  z-index: 0;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
  z-index: 1;
}

.fade-out {
  opacity: 1;
  animation: fadeOut 1s forwards;
  z-index: 2;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.overlay {
  position: relative;
  z-index: 10;
  background: radial-gradient(circle at 80% center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.5) 100%);
  padding: 3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info {
  max-width: 600px;
}

.genre {
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.details {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.description-container {
  margin-bottom: 1rem;
}

.description {
  margin-bottom: 0;
  font-size: 1rem;
  line-height: 1.5;
  overflow: hidden;
}

.description.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more-container {
  margin-top: 0.3rem;
}

.read-more {
  color: #e50914;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
  text-decoration: none;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.primary,
.secondary {
  padding: 0.6rem 1.2rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 6px;
  font-size: 0.95rem;
}

.primary {
  background-color: #e50914;
  color: white;
}

.secondary {
  background-color: white;
  color: black;
}

.slider-dots {
  display: flex;
  gap: 0.5rem;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.3s ease;
}

.dot.active {
  background-color: #fff;
}
</style>
