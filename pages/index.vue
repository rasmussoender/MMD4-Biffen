<script setup>
import { ref, onMounted } from 'vue'

const movies = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie')
    const data = await response.json()
    movies.value = data
  } catch (error) {
    console.error('Error fetching movies:', error)
  }

  setTimeout(() => {
    if (slider.value) {
      const slideWidth = 180
      const initialScroll = (activeSlideIndex.value * slideWidth) - (slider.value.clientWidth / 2) + (slideWidth / 2)
      slider.value.scrollLeft = initialScroll
    }
  }, 100)
})

const heroBgImage = new URL('@/assets/img/sing-sing-bg.jpg', import.meta.url).href

const films = [
  {
    id: 1,
    title: "Queer",
    poster: new URL('@/assets/img/sing-sing-poster.jpg', import.meta.url).href
  },
  {
    id: 2,
    title: "Under Stjernerne",
    poster: new URL('@/assets/img/seebach-poster.jpg', import.meta.url).href
  },
  {
    id: 3,
    title: "Unknown",
    poster: new URL('@/assets/img/dylan-poster.jpg', import.meta.url).href
  },
  {
    id: 4,
    title: "Sing Sing",
    poster: new URL('@/assets/img/sing-sing-poster.jpg', import.meta.url).href
  },
  {
    id: 5,
    title: "Busters Verden",
    poster: new URL('@/assets/img/buster-poster.jpg', import.meta.url).href
  },
  {
    id: 6,
    title: "Sauna",
    poster: new URL('@/assets/img/sauna-poster.jpg', import.meta.url).href
  }
]

const slider = ref(null)
const activeSlideIndex = ref(3)

const scrollLeft = () => {
  if (slider.value) {
    slider.value.scrollLeft -= 200
    updateActiveSlide()
  }
}

const scrollRight = () => {
  if (slider.value) {
    slider.value.scrollLeft += 200
    updateActiveSlide()
  }
}

const updateActiveSlide = () => {
  if (!slider.value) return

  const sliderRect = slider.value.getBoundingClientRect()
  const sliderCenter = sliderRect.left + sliderRect.width / 2

  let closest = null
  let closestDistance = Infinity

  slider.value.querySelectorAll('.slide').forEach((slide, index) => {
    const slideRect = slide.getBoundingClientRect()
    const slideCenter = slideRect.left + slideRect.width / 2
    const distance = Math.abs(slideCenter - sliderCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closest = index
    }
  })

  if (closest !== null) {
    activeSlideIndex.value = closest
  }
}
</script>

<template>
  <section class="hero" :style="`background-image: url('${heroBgImage}')`">
    <div class="overlay">
      <div class="info">
        <p class="genre">Drama | Fængsel</p>
        <h1 class="title">Sing Sing</h1>
        <ul class="details">
          <li>⭐ 7.4/10</li>
          <li>📅 18 dec. 2024</li>
          <li>⏱️ 2:36</li>
          <li>🔞 7 år+</li>
        </ul>
        <p class="description">
          Divine G sidder fængslet i Sing Sing for en forbrydelse, han ikke har begået,
          men finder mening i livet gennem en...
        </p>
        <div class="buttons">
          <button class="primary">🎟️ Bestil billetter</button>
          <button class="secondary">▶️ Se trailer</button>
        </div>
      </div>

      <div class="slider-section">
        <div class="navigation-arrows">
          <button class="arrow" @click="scrollLeft">❮</button>
          <button class="arrow" @click="scrollRight">❯</button>
        </div>
        <div class="slider-wrapper">
          <div class="slider" ref="slider">
            <div 
              class="slide" 
              v-for="(film, index) in films" 
              :key="film.id"
              :class="{ active: index === activeSlideIndex }"
            >
              <img :src="film.poster" :alt="film.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  max-width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.overlay {
  background: radial-gradient(
    circle at 80% center,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0.5) 100%
  );
  padding: 3rem;
  flex: 1;
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

.description {
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5;
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

.slider-section {
  width: 100vw;
  position: relative;
  margin-top: 2rem;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 1rem 0;
  position: relative;
}

.slider {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  scroll-behavior: smooth;
  overflow-x: auto;
  padding: 1rem 2rem;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slide {
  position: relative;
}

.slide img {
  width: 100%;
  max-width: 180px;
  height: 270px;
  border-radius: 10px;
  transition: transform 0.3s ease;
  object-fit: cover;
}

.slide:hover img {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
}

.slide.active img {
  border: 2px solid white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
}

.navigation-arrows {
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 2rem;
}

.arrow {
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 1.5rem;
  border: none;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.arrow:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>
