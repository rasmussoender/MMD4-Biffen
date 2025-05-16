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

  if (emailInput.value) {
    emailInput.value.addEventListener("keydown", e => {
      if (e.key === "Enter") handleSendClick()
    })
  }
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

// Nyhedsbrev funktionalitet
const emailInput = ref(null)
const thankYouMsg = ref(null)

const handleSendClick = () => {
  const email = emailInput.value?.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (email && emailRegex.test(email)) {
    thankYouMsg.value.style.display = "block"
    emailInput.value.value = ""
  } else {
    alert("Indtast en gyldig e-mailadresse")
  }
}
</script>


<template>
  <section class="forside-hero">
    <div v-if="previousIndex !== null" class="forside-hero-background-layer forside-hero-fade-out" :style="{ backgroundImage: `url(${movies[previousIndex].background_image})` }"></div>
    <div class="forside-hero-background-layer" :class="{ 'forside-hero-fade-in': isFading }" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>
    <div v-if="!hasMounted" class="forside-hero-background-layer" :style="{ backgroundImage: `url(${movies[currentIndex].background_image})` }"></div>


    <div class="forside-hero-overlay">
      <HeaderImageBackground />
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

      <div class="forside-hero-slider-mobile-arrows">
  <button @click="prevMovie" class="forside-hero-arrow">
    <span class="material-icons forside-hero-icon-arrow">chevron_left</span>
  </button>
  <button @click="nextMovie" class="forside-hero-arrow">
    <span class="material-icons forside-hero-icon-arrow">chevron_right</span>
  </button>
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
    <div class="film-program-container-mobile">
  <div class="film-program-mobile">

    <div class="film-program-content-mobile">
      <div class="program-film-poster-mobile">
        <img src="../assets/img/queer-poster.jpg" alt="">
      </div>
      <div class="film-program-detaljer-mobile">
        <div class="film-program-titel-og-info-mobile">
          <h3>Queer</h3>
          <ul>
            <li><i class="fas fa-clock"></i>2:36 t</li>
            <li><i class="fas fa-child-reaching"></i>7 år+</li>
          </ul>
        </div>
      </div>
      <hr class="film-program-hr-mobile">
    </div>

    <div class="film-program-content-mobile">
      <div class="program-film-poster-mobile">
        <img src="../assets/img/queer-poster.jpg" alt="">
      </div>
      <div class="film-program-detaljer-mobile">
        <div class="film-program-titel-og-info-mobile">
          <h3>Queer</h3>
          <ul>
            <li><i class="fas fa-clock"></i>2:36 t</li>
            <li><i class="fas fa-child-reaching"></i>7 år+</li>
          </ul>
        </div>
      </div>
      <hr class="film-program-hr-mobile">
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
  <section class="forside-entry-section">
  <div class="forside-entry-grid">
    <div class="forside-entry-card forside-entry-card--white-bg">
      <img src="../assets/img/cinemateket-entry.png" alt="Card 1">
      <hr>
      <h3>Cinemateket</h3>
      <p>Oplev store klassikere, sjældne filmperler og spændende events i Cinemateket i Biffen.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/filmklubben-entry.png" alt="Card 2">
      <hr>
      <h3>Filmklubber</h3>
      <p>Meld dig ind i en filmklub, og se udvalgte film til reduceret pris!</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/events-entry.png" alt="Card 3">
      <hr>
      <h3>Events</h3>
      <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/gavekort-entry.png" alt="Card 4">
      <hr>
      <h3>Gavekort</h3>
      <p>Et gavekort til Biffen er mere end bare en gave – det er en oplevelse. Se også vores øvrige billetter.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/a-salen_lille.jpg" alt="Card 5">
      <hr>
      <h3>Book en biografsal</h3>
      <p>Book en af vores sale. Perfekt til skoler, virksomhedsarrangementer, børnefødselsdage mm.</p>
    </div>
    <div class="forside-entry-card">
      <img src="../assets/img/kontakt-entry.jpg" alt="Card 6">
      <hr>
      <h3>Kontakt os</h3>
    </div>
  </div>
</section>
<section>
  <h2 class="overskrift-med-streg"><span>Vi elsker vores samarbejde med</span></h2>
  <div class="samarbejde-container">
    <img src="../assets/img/dansk-film-insti.png" alt="Logo 1">
    <img src="../assets/img/eu-cinema.png" alt="Logo 2">
    <img src="../assets/img/aalborg-kommune.png" alt="Logo 3">
  </div>
</section>
<section>
  <div class="nyhedsbrev-wrapper">
    <div class="icon-wrapper">
      <span class="material-symbols-outlined">mail</span>
    </div>

    <div class="nyhedsbrev-card">
      <h2 class="nyhedsbrev-overskrift">Nyhedsbrev</h2>
      <p class="nyhedsbrev-underoverskrift">Sidste nyt om film og events</p>

      <div class="nyhedsbrev-form">
        <input
          ref="emailInput"
          type="email"
          placeholder="Indtast mail her..."
          id="email-input"
        />
        <button @click="handleSendClick">Send</button>
      </div>

      <p ref="thankYouMsg" id="thank-you" class="nyhedsbrev-tak">
        Tak for din tilmelding - det betyder noget for os!
      </p>
    </div>
  </div>
</section>

 <Footer />

</template>

<style scoped>
.forside-hero {
  width: 100%;
  min-height: 75vh;
  position: relative;
  overflow: hidden;
  color: white;
  display: flex;
  flex-direction: column;
  border-radius: 0;
}

@media (min-width: 1024px) and (max-height: 900px) {
  .forside-hero {
    min-height: 90vh;
  }
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 3rem;
}

.forside-hero-info {
  max-width: 700px;
  padding: 8rem 2rem 2rem 120px;
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

.forside-hero-slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
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

.forside-hero-slider-mobile-arrows {
  display: none;
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

/* Responsivitet */
@media (max-width: 1024px) {
  .forside-hero-info {
    padding-left: 4rem;
    padding-top: 6rem;
  }

  .forside-hero-title {
    font-size: 2.5rem;
  }

  .forside-hero-description {
    font-size: 16px;
  }

  .forside-hero-btn {
    font-size: 0.9rem;
    padding: 8px 1rem;
  }

  .forside-hero-btn .material-icons,
  .forside-hero-btn .material-symbols-outlined {
    font-size: 28px;
  }

  .forside-hero-slider-controls {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .forside-hero-info {
    padding-left: 2rem;
    padding-top: 4rem;
  }

  .forside-hero-title {
    font-size: 2rem;
  }

  .forside-hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .forside-hero-slider-controls {
    flex-direction: column;
    gap: 1rem;
  }
}

.section-boks-1-container {
  padding-left: 120px;
  padding-right: 120px;
  margin-top: 8rem;
  margin-bottom: 12rem;
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

.film-program-container-mobile {
  display: none;
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
  margin-bottom: 12rem;
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

.forside-entry-section {
  padding: 0 120px;
  margin-bottom: 12rem;
}

.forside-entry-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 83px;
}

.forside-entry-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
}

.forside-entry-card img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  transition: transform 0.3s ease, box-shadow 0.6s ease;
  margin-bottom: 1rem;
}

.forside-entry-card:hover img {
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.forside-entry-card hr {
  position: relative;
  height: 2px;
  background-color: white;
  border: none;
  width: 100%;
  margin: 16px 0 8px;
  overflow: hidden;
}

.forside-entry-card hr::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #F63758;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease-in-out;
  z-index: 2;
}

.forside-entry-card:hover hr::after {
  transform: scaleX(1);
}

.forside-entry-card h3 {
  margin-top: 1rem;
  font-size: 34px;
  font-weight: 500;
}

.forside-entry-card p {
  margin: 0;
  font-size: 18px;
  font-weight: 300;
}

.forside-entry-card--white-bg img {
  object-fit: contain;
  background-color: white;
}

.forside-entry-card--white-bg:hover img {
  transform: scale(1.03);
  box-shadow: 0px 0px 20px 2px #4C90FF;
}

.samarbejde-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 140px;
  padding: 0 120px;
  margin-top: 10rem;
  max-width: 100%;
  box-sizing: border-box;
  flex-wrap: wrap;
}

.samarbejde-container img {
  height: 130px;
  object-fit: contain;
  display: block;
  max-width: 100%;
}

.nyhedsbrev-wrapper {
  position: relative;
  max-width: 700px;
  margin: 120px auto 0;
  margin-top: 16rem;
}

.icon-wrapper {
  position: absolute;
  top: -54px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1d2a4a;
  border: 3px solid #4a90e2;
  border-radius: 50%;
  width: 108px;
  height: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  z-index: 2;
}

.icon-wrapper .material-symbols-outlined {
  font-size: 48px;
  line-height: 1;
}

.nyhedsbrev-card {
  background-color: #1d2a4a;
  border-radius: 40px;
  padding: 80px 40px 60px;
  text-align: center;
  color: white;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.nyhedsbrev-overskrift {
  font-size: 2.5rem;
  font-weight: 700;
  margin-top: 10px;
}

.nyhedsbrev-underoverskrift {
  font-size: 1.25rem;
  color: #cbd2e0;
  margin-bottom: 4rem
}

.nyhedsbrev-form {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.nyhedsbrev-form input {
  padding: 20px;
  border-radius: 16px;
  border: none;
  width: 400px;
  font-size: 1rem;
}

.nyhedsbrev-form button {
  padding: 20px 30px;
  border: none;
  border-radius: 16px;
  background-color: #ff3b5c;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.nyhedsbrev-form button:hover {
  background-color: #e03250;
}

.nyhedsbrev-tak {
  font-size: 1.1rem;
  color: #ffffff;
  display: none;
}

/* Responsivitet */

/* Mobile: max-width 768px */
@media (max-width: 768px) {
  .forside-hero-slider-mobile-arrows {
    position: absolute;
    bottom: 6.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    z-index: 5;
  }

  .film-program-container {
  display: none;
}

.film-program-container-mobile {
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 4rem;
}

.film-program-mobile {
  padding: 30px;
  border-radius: 20px;
  margin-top: 4rem;
  background: #202F4D;
}

.film-program-content-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding-bottom: 2rem;
}

.program-film-poster-mobile img {
  width: 100%;
  max-width: 200px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  display: block;
  margin: 0 auto;
}

.film-program-detaljer-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.film-program-titel-og-info-mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.film-program-titel-og-info-mobile h3 {
  font-size: 28px;
  color: white;
  font-weight: 700;
  margin: 0;
}

.film-program-titel-og-info-mobile ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;  
  justify-content: center;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.film-program-titel-og-info-mobile li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
  margin-bottom: 0.7rem;
}

.film-program-titel-og-info-mobile i {
  color: #F63758;
}

.film-program-hr-mobile {
  width: 100%;
  height: 1px;
  background-color: white;
  border: none;
  margin-top: 2rem;
  margin-bottom: 6rem;
}

.film-program-content-mobile:last-of-type .film-program-hr-mobile {
  margin-bottom: 0;
}

  .forside-hero-slider-controls > button {
    display: none;
  }
  .section-boks-1-container,
  .film-program-container,
  .forside-entry-section,
  .vis-flere-film-cta,
  .samarbejde-container,
  .overskrift-med-streg,
  .nyhedsbrev-wrapper {
    padding-left: 20px;
    padding-right: 20px;
  }

  .forside-entry-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .section-boks-1-content {
    flex-direction: column;
    gap: 40px;
  }
  .section-boks-1-text,
  .section-boks-1-video {
    max-width: 100%;
  }
  .section-boks-1-video video {
    height: auto;
  }
  .samarbejde-container {
    gap: 40px;
  }
  .nyhedsbrev-wrapper {
    margin: 8rem 0;
  }
  .nyhedsbrev-form input {
    width: 100%;
    max-width: 100%;
  }

  .forside-hero {
    min-height: 100vh;
  }
  .forside-hero-info {
    padding: 4rem 20px 2rem;
  }
  .forside-hero-title {
    font-size: 2rem;
  }
  .forside-hero-details {
    gap: 0.5rem;
    font-size: 14px;
  }
  .forside-hero-detail {
    font-size: 14px;
    padding: 4px 8px;
  }
  .forside-hero-description {
    font-size: 16px;
  }
  .forside-hero-buttons {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  .forside-hero-btn {
    width: auto;
    font-size: 0.95rem;
    padding: 10px 16px;
  }
  .forside-hero-btn .material-icons,
  .forside-hero-btn .material-symbols-outlined {
    font-size: 24px;
  }

  .forside-hero-slider-controls {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 4;
  }

  .forside-hero-slider-arrow-wrapper {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .forside-hero-slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
  }
}

/* Tablet: 769px - 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  .forside-entry-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .section-boks-1-content {
    flex-direction: column;
    align-items: center;
    gap: 60px;
  }
  .section-boks-1-text,
  .section-boks-1-video {
    max-width: 100%;
  }
  .section-boks-1-video video {
    height: auto;
  }
  .samarbejde-container {
    gap: 60px;
    padding: 0 40px;
  }
  .nyhedsbrev-form input {
    width: 100%;
    max-width: 400px;
  }
}

/* Laptop/Desktop: 1025px - 2199px */
@media (min-width: 1025px) and (max-width: 2199px) {
  .forside-entry-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .section-boks-1-content {
    flex-direction: row;
    gap: 70px;
  }
  .section-boks-1-text,
  .section-boks-1-video {
    max-width: 50%;
  }
}

/* Ultra-wide: 2200px and up */
@media (min-width: 2200px) {
  .forside-entry-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  .forside-hero-info {
    max-width: 900px;
    padding-left: 160px;
  }
  .section-boks-1-container,
  .film-program-container,
  .forside-entry-section,
  .vis-flere-film-cta,
  .overskrift-med-streg {
    padding-left: 200px;
    padding-right: 200px;
  }
  .samarbejde-container {
    padding-left: 200px;
    padding-right: 200px;
    gap: 160px;
  }
  .nyhedsbrev-wrapper {
    max-width: 900px;
    padding-left: 200px;
    padding-right: 200px;
  }
  .nyhedsbrev-form input {
    width: 500px;
  }
  .nyhedsbrev-form button {
    padding: 22px 36px;
  }
}


</style>
