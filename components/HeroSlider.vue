<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const movies = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?forside-hero-slider=17&_embed')
    movies.value = await res.json()
  } catch (e) {
    error.value = e
    console.error('Fejl ved hentning af film:', e)
  }
})
</script>

<template>
  <div class="hero-slider">
    <Swiper
      :modules="[Autoplay, Navigation, Pagination]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 7000 }"
      :pagination="{ clickable: true, el: '.custom-pagination' }"
      :navigation="{ nextEl: '.custom-next', prevEl: '.custom-prev' }"
    >
      <SwiperSlide v-for="film in movies" :key="film.id">

        <div 
          class="slide" 
          :style="{
            background: `
              linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
              radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
              url(${film.acf.hero_slider_backdrop?.url || ''})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
        >
          <div class="slide-content">

            <p class="forside-hero-genre">
            <template v-for="(g, i) in film.acf.genre" :key="i">
                <span>{{ g.filmgenre }}</span>
                <span v-if="i < film.acf.genre.length - 1" class="forside-hero-genre-separator">|</span>
            </template>
            </p>

            <h1 class="forside-hero-title">{{ film.acf.title }}</h1>
            
            <ul class="forside-hero-details">
              <li class="forside-hero-detail forside-hero-rating">
                <i class="fas fa-star forside-hero-icon-detail"></i><span>{{ film.acf.hero_slider_film_rating }}</span>
              </li>
              <li class="forside-hero-detail forside-hero-date">
                <i class="fas fa-film forside-hero-icon-detail"></i><span>{{ film.acf.udgivelsesdato }}</span>
              </li>
              <li class="forside-hero-detail forside-hero-time">
                <i class="fas fa-clock forside-hero-icon-detail"></i><span>{{ film.acf.varighed }}</span>
              </li>
              <li class="forside-hero-detail forside-hero-age">
                <i class="fas fa-child-reaching forside-hero-icon-detail"></i><span>{{ film.acf.age[0]?.aldersgraense }}</span>
              </li>
            </ul>
            
            <div class="forside-hero-description-container">
            <p class="forside-hero-description">
            {{ film.acf.description.length > 350 ? film.acf.description.slice(0, 350) + '...' : film.acf.description }}
            </p>
            </div>

            <div class="forside-hero-buttons">

                <router-link 
                :to="`/film/${film.slug}`" 
                class="forside-hero-btn forside-hero-btn-primary"
                >
                <span class="material-symbols-outlined">local_activity</span>
                Bestil billetter
                </router-link>

                <a 
                :href="film.acf.trailer" 
                target="_blank" 
                class="forside-hero-btn forside-hero-btn-secondary"
                >
                <i class="fab fa-youtube"></i>
                Se trailer
                </a>

            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <div class="custom-controls">
      <button class="custom-prev" aria-label="Forrige slide"><i class="fa-solid fa-circle-chevron-left"></i></button>
      <div class="custom-pagination"></div>
      <button class="custom-next" aria-label="Næste slide"><i class="fa-solid fa-circle-chevron-right"></i></button>
    </div>
  </div>
</template>




<style scoped>
.hero-slider {
  position: relative; 
  height: 90vh;      
  width: 100%;
  overflow: hidden;
}

.slide {
  height: 90vh;      
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--space-container);
  color: white;
  background-color: black;
}

.custom-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: auto;
  z-index: 10;
  background: transparent;
}

.custom-prev,
.custom-next {
  background: rgba(24, 31, 47, 0.7);
  border: none;
  color: var(--interactive-red);
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.3s ease;
  margin: 0;
}

.custom-pagination {
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
}

.custom-pagination .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.custom-pagination .swiper-pagination-bullet-active {
  background: white;
}

.forside-hero-genre {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  font-weight: 500;
}

.forside-hero-genre-separator {
  padding: 0 0.5rem;
  font-weight: bold;
  color: white;
}

.forside-hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  line-height: 120%;
}

.forside-hero-details {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
  margin-top: 24px;
  flex-wrap: wrap;
}

.forside-hero-detail {
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

.forside-hero-rating {
  background-color: #5C4315;
}

.forside-hero-rating .forside-hero-icon-detail {
  color: gold;
}

.forside-hero-date .forside-hero-icon-detail,
.forside-hero-time .forside-hero-icon-detail,
.forside-hero-age .forside-hero-icon-detail {
  color: #F63758;
}

.forside-hero-description-container {
  margin-bottom: 1rem;
  margin-top: 3rem;
  width: 60vw;
}

.forside-hero-description {
  font-size: 18px;
  line-height: 175%;
  overflow: hidden;
}

.forside-hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.forside-hero-btn {
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
  text-decoration: none;
}

.forside-hero-btn .material-icons,
.forside-hero-btn .material-symbols-outlined {
  font-size: 34px;
}

.forside-hero-btn-primary {
  background-color: #d63d4a;
  color: white;
  border: none;
}

.forside-hero-btn-primary:hover {
  background-color: #b7313d;
}

.forside-hero-btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.forside-hero-btn-secondary i {
  font-size: 28px;
}

.forside-hero-btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

</style>
