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
  <section class="forside-hero">
    <div v-if="previousIndex !== null" class="forside-hero-background-layer forside-hero-fade-out" :style="{ backgroundImage: `url(${movies[previousIndex].background_image})` }"></div>
    <div class="forside-hero-background-layer" :class="{ 'forside-hero-fade-in': isFading }" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>
    <div v-if="!hasMounted" class="forside-hero-background-layer" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>

    <div class="forside-hero-overlay">
      <div class="forside-hero-info">
        <p class="forside-hero-genre">
          <template v-for="(g, i) in movies[currentIndex].genre" :key="i">
            <span>{{ g }}</span>
            <span v-if="i < movies[currentIndex].genre.length - 1" class="forside-hero-genre-separator">|</span>
          </template>
        </p>

        <h1 class="forside-hero-title">{{ movies[currentIndex].title }}</h1>

        <ul class="forside-hero-details">
          <li class="forside-hero-detail forside-hero-rating"><i class="fas fa-star forside-hero-icon-detail"></i><span>{{ movies[currentIndex].rating }}</span></li>
          <li class="forside-hero-detail forside-hero-date"><i class="fas fa-film forside-hero-icon-detail"></i><span>{{ movies[currentIndex].release_date }}</span></li>
          <li class="forside-hero-detail forside-hero-time"><i class="fas fa-clock forside-hero-icon-detail"></i><span>{{ movies[currentIndex].duration }}</span></li>
          <li class="forside-hero-detail forside-hero-age"><i class="fas fa-child-reaching forside-hero-icon-detail"></i><span>{{ movies[currentIndex].age_rating }}</span></li>
        </ul>

        <div class="forside-hero-description-container">
          <p ref="descriptionEl" class="forside-hero-description" :class="{ 'forside-hero-collapsed': !expanded }">{{ movies[currentIndex].description }}</p>
          <div v-if="showReadMore && !expanded" class="forside-hero-read-more-container">
            <a href="#" class="forside-hero-read-more" @click.prevent="toggleDescription">Læs mere</a>
          </div>
          <div v-if="expanded" class="forside-hero-read-more-container">
            <a href="#" class="forside-hero-read-more" @click.prevent="toggleDescription">Vis mindre</a>
          </div>
        </div>

        <div class="forside-hero-buttons">
          <button class="forside-hero-btn forside-hero-btn-primary">
            <span class="material-symbols-outlined">local_activity</span>
            Bestil billetter
          </button>
          <button class="forside-hero-btn forside-hero-btn-secondary">
            <i class="fab fa-youtube"></i>
            Se trailer
          </button>
        </div>
      </div>

      <div class="forside-hero-slider-controls">
        <button @click="prevMovie" class="forside-hero-arrow">
          <span class="material-icons forside-hero-icon-arrow">chevron_left</span>
        </button>
        <div class="forside-hero-slider-dots">
          <span v-for="(movie, index) in movies" :key="movie.id" :class="{ 'forside-hero-dot': true, 'forside-hero-active': index === currentIndex }"></span>
        </div>
        <button @click="nextMovie" class="forside-hero-arrow">
          <span class="material-icons forside-hero-icon-arrow">chevron_right</span>
        </button>
      </div>
    </div>
  </section>
  <section>
    <div class="section-boks-1-container">
    <div class="section-boks-1">
      <div class="section-boks-1-content">
        <div class="section-boks-1-text">
          <h4 class="subtitle-boks-1">Velkommen til</h4>
          <h2 class="overskrift-boks-1"><span>Biffen</span></h2>
          <p class="section-boks-1-beskrivelse">Biffen Nordkraft er Aalborgs eneste uafhængige biograf. Vi har specialiseret os i små som store filmperler, som ikke altid finder vej til de traditionelle biografer. I vores 3 sale vises der både nye premierefilm og historiske klassikere. Derudover afholder vi filmfestivaler (f.eks. CPH DOX) og arrangerer oplæg og interviews med instruktører og skuespillere m. fl. - altid med den gode film i centrum.</p>
        </div>
        <div class="section-boks-1-video">
          <video autoplay muted loop>
            <source src="../assets/vid/biffen-video-forside.mp4" type="video/mp4">
            Din browser understøtter ikke videoafspilning.
          </video>
        </div>
      </div>
    </div>
    </div>
  </section>
  <section>
    <h2 class="overskrift-med-streg"><span>Program</span></h2>
    <div class="film-program-container">
      <div class="film-program">
        <div class="film-program-content">
        <div class="program-film-poster">
          <img src="../assets/img/queer-poster.jpg" alt="">
        </div>
        <div class="film-program-detaljer">
          <div class="film-program-titel-og-info">
            <h3>Queer</h3>
            <ul>
              <li><i class="fas fa-clock"></i>2:36 t</li>
              <li><i class="fas fa-child-reaching"></i>7 år+</li>
            </ul>
          </div>
          <hr class="film-program-hr">
          <!-- Indsæt tider her -->
        </div>
        </div>
        <div class="film-program-content">
        <div class="program-film-poster">
          <img src="../assets/img/queer-poster.jpg" alt="">
        </div>
        <div class="film-program-detaljer">
          <div class="film-program-titel-og-info">
            <h3>Queer</h3>
            <ul>
              <li><i class="fas fa-clock"></i>2:36 t</li>
              <li><i class="fas fa-child-reaching"></i>7 år+</li>
            </ul>
          </div>
          <hr class="film-program-hr">
          <!-- Indsæt tider her -->
        </div>
        </div>
      </div>
    </div>
    <div class="vis-flere-film-cta">
  <a href="#">
    Vis flere film
    <span class="material-symbols-outlined">arrow_circle_right</span>
  </a>
</div>
  </section>
  <section>
    <h2 class="overskrift-med-streg"><span>Nyheder på vej</span></h2>
  </section>
  <section class="forside-entry-points-container">
  <div class="entry entry-cinemateket">
    <img src="../assets/img/sauna-poster.jpg" alt="Cinemateket logo" />
    <div class="entry-text">
      <h3>Cinemateket</h3>
      <p>Oplev store klassikere, sjældne filmperler og spændende events i Cinemateket i Biffen.</p>
    </div>
  </div>

  <div class="entry-side">
    <div class="entry entry-filmklubber">
      <img src="../assets/img/sauna-poster.jpg" alt="Filmklubber" />
      <div class="entry-text">
        <h3>Filmklubber</h3>
        <p>Meld dig ind i en filmklub, og se udvalgte film til reduceret pris!</p>
      </div>
    </div>
    <div class="entry entry-events">
      <img src="../assets/img/sauna-poster.jpg" alt="Events" />
      <div class="entry-text">
        <h3>Events</h3>
        <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
      </div>
    </div>
  </div>
</section>

<div class="forside-extra-cards">
  <div class="entry">
    <img src="../assets/img/sauna-poster.jpg" alt="Gavekort" />
    <div class="entry-text">
      <h3>Gavekort</h3>
      <p>Køb et gavekort og glæd én, du holder af, med en god filmoplevelse.</p>
    </div>
  </div>
  <div class="entry">
    <img src="../assets/img/sauna-poster.jpg" alt="Biografsal" />
    <div class="entry-text">
      <h3>Biografsal</h3>
      <p>Læs mere om vores sale og faciliteter hos Biffen Nordkraft.</p>
    </div>
  </div>
  <div class="entry">
    <img src="../assets/img/sauna-poster.jpg" alt="Kontakt os" />
    <div class="entry-text">
      <h3>Kontakt os</h3>
      <p>Har du spørgsmål? Kontakt os her – vi er klar til at hjælpe dig.</p>
    </div>
  </div>
</div>


</template>

<style scoped>
.forside-hero {
  width: 100%;
  height: 75vh;
  position: relative;
  overflow: hidden;
  color: white;
  border-radius: 0;
}

.forside-hero-background-layer {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 1s ease-in-out;
  opacity: 1;
  z-index: 0;
}

.forside-hero-fade-in {
  opacity: 0;
  animation: fadeIn 1s forwards;
  z-index: 1;
}

.forside-hero-fade-out {
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

.forside-hero-overlay {
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

.forside-hero-info {
  max-width: 700px;
  padding-left: 120px;
  padding-top: 12rem;
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
}

.forside-hero-description {
  font-size: 18px;
  line-height: 175%;
  overflow: hidden;
}

.forside-hero-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.forside-hero-read-more {
  color: #F63758;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-size: 18px;
}

.forside-hero-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
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
}

.forside-hero-btn .material-icons, .material-symbols-outlined {
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

.forside-hero-slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.forside-hero-arrow {
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

.forside-hero-arrow:hover {
  background: rgba(255, 255, 255, 0.15);
}

.forside-hero-slider-dots {
  display: flex;
  gap: 0.5rem;
}

.forside-hero-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  transition: background-color 0.3s ease;
}

.forside-hero-active {
  background-color: #fff;
}

.forside-hero-icon-detail {
  font-size: 16px;
}

.forside-hero-icon-arrow {
  font-size: 30px;
}

.section-boks-1-container {
  padding-left: 120px;
  padding-right: 120px;
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.section-boks-1 {
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
}

.section-boks-1-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 70px;
}

.section-boks-1-text,
.section-boks-1-video {
  flex: 1;
  max-width: 50%;
}

.section-boks-1-video video {
  width: 100%;
  height: 500px;
  border-radius: 20px;
  object-fit: cover;
}

.overskrift-boks-1 {
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.overskrift-boks-1 span {
  position: relative;
  display: inline-block;
}

.overskrift-boks-1 span::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 4px;
  background-color: #F63758;
}

.subtitle-boks-1 {
  font-size: 26px;
  font-weight: 200;
  line-height: 150%;
}

.section-boks-1-beskrivelse {
  font-size: 18px;
  line-height: 175%;
  margin-top: 40px;
}

.overskrift-med-streg {
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 1rem;
  padding-left: 120px;
  max-width: 550px;
}

.overskrift-med-streg span {
  position: relative;
  display: inline-block;
}

.overskrift-med-streg span::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 50%;
  height: 4px;
  background-color: #F63758;
}

.film-program-container {
  padding-left: 120px;
  padding-right: 120px;
  margin-bottom: 3rem;
}

.film-program {
  background: #202F4D;
  padding: 50px;
  border-radius: 20px;
  margin-top: 4rem;
}

.film-program-content {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  padding-bottom: 6rem;
}

.film-program-content:last-child {
  padding-bottom: 0;
}

.program-film-poster img {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
}

.film-program-detaljer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.film-program-titel-og-info {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.film-program-titel-og-info h3 {
  font-size: 36px;
  color: white;
  font-weight: 700;
}

.film-program-titel-og-info ul {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.film-program-titel-og-info li {
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

.film-program-titel-og-info i {
  color: #F63758;
}

.film-program-hr {
  border: none;
  height: 1px;
  background-color: white;
  margin-top: 12px;
}

.vis-flere-film-cta {
  display: flex;
  justify-content: flex-end;
  padding-right: 120px;
  margin-bottom: 8rem;
}

.vis-flere-film-cta a {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 1rem;
  border: 2px solid white;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  text-decoration: none;
  font-weight: 500;
}

.vis-flere-film-cta .material-symbols-outlined {
  font-size: 30px;
}

/* Grid layout med 3 kolonner */
.forside-entry-points-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 120px;
  gap: 83px;
}

/* Cinemateket kort skal fylde 2 kolonner */
.entry-cinemateket {
  grid-column: span 2;
}

/* Tre kort nedenunder (gavekort osv.) */
.forside-extra-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0 120px;
  gap: 83px;
  margin-top: 83px;
}

/* Kort-styling */
.entry {
  background-color: #161b2c;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

/* Billeder */
.entry img {
  width: 100%;
  display: block;
}

/* Tekstcontainer */
.entry-text {
  padding: 1rem 1.5rem;
}

/* Overskrift */
.entry-text h3 {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  border-bottom: 2px solid #e94560;
  display: inline-block;
  padding-bottom: 0.25rem;
}

/* Brødtekst */
.entry-text p {
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
  color: #dcdcdc;
}


</style>
