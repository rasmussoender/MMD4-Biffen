<!-- brugt library: swiperjs:  https://swiperjs.com/ -->
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
      :speed="1000"
      :autoplay="{ delay: 4000, pauseOnMouseEnter: true }"
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
          <div class="slide-content widthContainer">

            <p class="forside-hero-genre">
            <template v-for="(g, i) in film.acf.genre" :key="i">
                <span>{{ g.filmgenre }}</span>
                <span v-if="i < film.acf.genre.length - 1" class="forside-hero-genre-separator">|</span>
            </template>
            </p>

            <h1 class="forside-hero-title">{{ film.acf.title }}</h1>
            
            <ul class="forside-hero-details">
              <li class="forside-hero-detail forside-hero-rating">
                <i class="fas fa-star forside-hero-icon-detail"></i><span>{{ film.acf.hero_slider_film_rating }}/10</span>
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
            {{ film.acf.description.length > 200 ? film.acf.description.slice(0, 200) + '...' : film.acf.description }}
            </p>
            </div>

            <div class="generalButtons">

                <router-link 
                :to="`/film/${film.slug}`" 
                class="generalbtn btn-primary"
                >
                <span class="material-symbols-outlined">local_activity</span>
                Bestil billetter
                </router-link>

                <a 
                :href="film.acf.trailer" 
                target="_blank" 
                class="generalbtn btn-secondary"
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
  color: white;
  background-color: black;
}

.slide-content {
  padding: var(--space-container);
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
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  transition: color 0.5s;
}

.custom-prev:hover,
.custom-next:hover {
  color: var(--interactive-red);
}

.custom-pagination {
  display: flex;
  gap: 12px;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-items: center;
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
  margin-bottom: 3rem;
  margin-top: 3rem;
  width: 50vw;
}

.forside-hero-description {
  font-size: 18px;
  line-height: 175%;
  overflow: hidden;
}

/* Media queries */
@media (max-width: 767px) {
  .slide {
    height: 100vh;
  }
  .hero-slider {
    height: 100vh;
  }
  .forside-hero-title {
    font-size: 2rem;
    margin-bottom: 0;
  }
  .forside-hero-description-container {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;

  }

  .forside-hero-description {
    font-size: 15px;
  }

    .forside-hero-details  {
    margin-top: 1rem;
  }

  .forside-hero-detail  {
    font-size: 12px;
  }


  .generalButtons {
    justify-content: center;
  }

  .forside-hero-details {
    margin-bottom: 0;
    gap: 0.5rem;
  }

  .forside-hero-genre {
    display: none;
  }

}

</style>
