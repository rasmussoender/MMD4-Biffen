<script setup>
import { ref, onMounted, onUnmounted, watchEffect, nextTick } from 'vue'

const movies = ref([
  {
    id: 1,
    title: 'Sing Sing',
    genre: ['Drama', 'Fængsel'],
    rating: '7.4/10',
    release_date: '18 dec. 2024',
    duration: '2:36 t',
    age_rating: '7 år+',
    description: `Divine G sidder fængslet i Sing Sing for en forbrydelse, han ikke har begået, men finder mening i livet gennem en teatergruppe.`,
    background_image: new URL('@/assets/img/sing-sing-banner.png', import.meta.url).href
  },
  {
    id: 2,
    title: 'The Last Light',
    genre: ['Drama', 'Sci-fi'],
    rating: '7.9/10',
    release_date: '15 okt. 2025',
    duration: '2:15 t',
    age_rating: '11 år+',
    description: `I en fremtid hvor solen er ved at dø ud, kæmper menneskeheden for at overleve i evigt mørke.`,
    background_image: new URL('@/assets/img/dylan-banner.png', import.meta.url).href
  },
  {
    id: 3,
    title: 'Ocean Depths',
    genre: ['Dokumentar', 'Natur'],
    rating: '9.0/10',
    release_date: '1 jun. 2025',
    duration: '1:30 t',
    age_rating: 'Tilladt for alle',
    description: `Udforsk havets mysterier i denne visuelt betagende dokumentar.`,
    background_image: new URL('@/assets/img/queer-banner.png', import.meta.url).href
  },
  {
    id: 4,
    title: 'The Painter',
    genre: ['Drama', 'Kunst'],
    rating: '8.5/10',
    release_date: '21 apr. 2025',
    duration: '2:20 t',
    age_rating: '7 år+',
    description: `En kunstners liv bliver vendt på hovedet... En kunstners liv bliver vendt på hovedet... En kunstners liv bliver vendt på hovedet... En kunstners liv bliver vendt på hovedet... En kunstners liv bliver vendt på hovedet...`,
    background_image: new URL('@/assets/img/seebach-banner.jpg', import.meta.url).href
  },
  {
    id: 5,
    title: 'Jungle Strike',
    genre: ['Action', 'Thriller'],
    rating: '7.8/10',
    release_date: '7 mar. 2025',
    duration: '2:00 t',
    age_rating: '15 år+',
    description: `En elitesoldat sendes på mission...`,
    background_image: new URL('@/assets/img/sauna-hero.png', import.meta.url).href
  },
  {
    id: 6,
    title: 'Love in Winter',
    genre: ['Romantik', 'Drama'],
    rating: '6.9/10',
    release_date: '14 feb. 2025',
    duration: '1:45 t',
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
const intervalTime = 7000

const resetInterval = () => {
  clearInterval(intervalId)
  intervalId = setInterval(nextMovie, intervalTime)
}

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
  resetInterval()
}

const prevMovie = async () => {
  previousIndex.value = currentIndex.value
  isFading.value = true
  await nextTick()
  currentIndex.value = (currentIndex.value - 1 + movies.value.length) % movies.value.length
  expanded.value = false
  await nextTick()
  checkIfOverflowing()
  setTimeout(() => {
    previousIndex.value = null
    isFading.value = false
  }, fadeDuration)
  resetInterval()
}

const checkIfOverflowing = () => {
  const el = descriptionEl.value
  if (!el) return
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
  const maxHeight = lineHeight * 2
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
  intervalId = setInterval(nextMovie, intervalTime)
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
    <div v-if="previousIndex !== null" class="background-layer fade-out" :style="{ backgroundImage: `url(${movies[previousIndex].background_image})` }"></div>
    <div class="background-layer" :class="{ 'fade-in': isFading }" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>
    <div v-if="!hasMounted" class="background-layer" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>

    <div class="overlay">
      <div class="info">
        <p class="genre">
          <template v-for="(g, i) in movies[currentIndex].genre" :key="i">
            <span>{{ g }}</span>
            <span v-if="i < movies[currentIndex].genre.length - 1" class="genre-separator">|</span>
          </template>
        </p>

        <h1 class="title">{{ movies[currentIndex].title }}</h1>

        <ul class="details">
          <li class="detail rating"><i class="fas fa-star icon-detail"></i><span>{{ movies[currentIndex].rating }}</span></li>
          <li class="detail date"><i class="fas fa-film icon-detail"></i><span>{{ movies[currentIndex].release_date }}</span></li>
          <li class="detail time"><i class="fas fa-clock icon-detail"></i><span>{{ movies[currentIndex].duration }}</span></li>
          <li class="detail age"><i class="fas fa-child-reaching icon-detail"></i><span>{{ movies[currentIndex].age_rating }}</span></li>
        </ul>

        <div class="description-container">
          <p ref="descriptionEl" class="description" :class="{ collapsed: !expanded }">{{ movies[currentIndex].description }}</p>
          <div v-if="showReadMore && !expanded" class="read-more-container">
            <a href="#" class="read-more" @click.prevent="toggleDescription">Læs mere</a>
          </div>
          <div v-if="expanded" class="read-more-container">
            <a href="#" class="read-more" @click.prevent="toggleDescription">Vis mindre</a>
          </div>
        </div>

        <div class="buttons">
  <button class="btn btn-primary">
    <span class="material-icons">local_activity</span>
    Bestil billetter
  </button>
  <button class="btn btn-secondary">
    <i class="fab fa-youtube"></i>
    Se trailer
  </button>
</div>

      </div>

      <div class="slider-controls">
        <button @click="prevMovie" class="arrow">
          <span class="material-icons icon-arrow">chevron_left</span>
        </button>
        <div class="slider-dots">
          <span v-for="(movie, index) in movies" :key="movie.id" :class="{ dot: true, active: index === currentIndex }"></span>
        </div>
        <button @click="nextMovie" class="arrow">
          <span class="material-icons icon-arrow">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 75vh;
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
  background:
    linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
    radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.info {
  max-width: 700px;
  padding-left: 120px;
  padding-top: 12rem;
}

.genre {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  font-weight: 500;
}

.genre-separator {
  padding: 0 0.5rem;
  font-weight: bold;
  color: white;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 120%;
}

.details {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  margin-top: 24px;
}

.detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
}

.detail.rating {
  background-color: #5C4315;
}

.detail.rating .icon-detail {
  color: gold;
}

.detail.date .icon-detail,
.detail.time .icon-detail,
.detail.age .icon-detail {
  color: #F63758;
}

.description-container {
  margin-bottom: 1rem;
  margin-top: 3rem;
}

.description {
  font-size: 18px;
  line-height: 175%;
  overflow: hidden;
}

.description.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: #F63758;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-size: 18px;
}

.buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: 'Readex Pro', sans-serif;
  font-size: 1rem;
  border-radius: 10px;
  padding: 10px 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  white-space: nowrap;
}

.btn .material-icons {
  font-size: 34px;
}

.btn-primary {
  background-color: #d63d4a;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #b7313d;
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary i {
  font-size: 28px;
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 8px;
  width: 38px;
  height: 38px;
  background: transparent;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.15);
}

.slider-dots {
  display: flex;
  gap: 0.5rem;
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

.icon-detail {
  font-size: 16px;
}

.icon-arrow {
  font-size: 30px;
}
</style>
