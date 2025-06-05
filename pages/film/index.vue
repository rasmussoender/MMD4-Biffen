<script setup>
// Tager brug af gsap library: https://gsap.com/
import { onMounted, nextTick } from 'vue';
import { useHead, useFetch } from '#app';
import gsap from 'gsap';

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Alle Film',
  meta: [
    { name: 'description', content: 'Biffens film' },
    { name: 'keywords', content: 'biograf, alle, film, vintage, aalborg, biograftur' }
  ]
});
// Her fetches data fra wordpress api, ved hjælp af useFetch. 
// Her defineres pending og error, altså hvis der skulle ske en fejl kommer der besked, samt når den loader
const { data: movies, pending, error } = await useFetch(
  'https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100'
);

// Gsap animation bruger onMOunted, som kører koden når at den er klar til at blive vist
// Await nexttick venter på at dom'en er færdig med at køre
onMounted(async () => {
  await nextTick();
  gsap.from('.movieCard', {
    // Herinde kan vi definere vores animation, og hvordan det skal opføre sig
    opacity: 0, // Starter med at være usynlig
    y: 30,  // Starter med at være 30px nede
    stagger: 0.1, // Stagger er hvor lang tid der skal gå mellem hver animation
    duration: 0.8, // Hvor lang tid animationen skal tage
    ease: 'power2.out' // Easing funktion der gør at animationen føles mere naturlig
  });
});

// Hvis det er en fremtidig/kommende film, vises der et lille "kommende" tag på cardet
// 
const isUpcoming = (releaseDate) => {
  // Laver datoen for idag
  const today = new Date();
  // Laver dato ud fra filmens premieredato
  const release = new Date(releaseDate);
  // Returnerer true, hvis filmen kommer i fremtiden
  // Og dermed har vi en v-if i template der laver dette "kommende" tag for fremtidige film
  return release > today;
};

// Formatering af dato
const formatDate = (dateString) => {
  // Definerer at vi gerne vil vise dag, måned kort og år
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  // Retunerer datoen i dansk format på måde vi har defineret
  return new Date(dateString).toLocaleDateString('da-DK', options);
};
</script>

<template>
  <Header />
  <main>
    <div class="movieContainer widthContainer">
      <h1 class="overskrift-med-streg"><span>Alle Film</span></h1>

      <div class="buttonContainer">
        <button class="calenderButton">
          <i class="fa-solid fa-calendar-days"></i> Kalender
        </button>
        <button class="filterButton">
          <i class="fa fa-filter"></i> Filter
        </button>
      </div>

      <div v-if="pending">
        <i class="fa fa-spinner fa-spin"></i> Loader alle film
      </div>

      <div v-else-if="error">
        <p>Kunne ikke hente filmene</p>
      </div>

      <div v-else class="movieCards">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="movieCard"
        >
          <router-link
            :to="`/film/${movie.slug}`"
            class="movieLink"
          >
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
              <span
                v-if="isUpcoming(movie.acf.udgivelsesdato)"
                class="upcomingTag"
              >
                Kommende
              </span>
            </div>
          </router-link>
          <router-link
            :to="`/film/${movie.slug}`"
            class="movieLink"
          >
            <button class="ticketButton">
              <i class="fa-solid fa-ticket"></i> Bestil billetter
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>


<style scoped>
.movieContainer {
  padding: 40px 20px;
}

.buttonContainer {
  display: flex;
  justify-content: right; 
  gap: 20px;
  margin-bottom: 20px;
}

.filterButton,
.calenderButton {
  background: var(--interactive-red);
  color: white;
  width: 90px; 
  height: 90px; 
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-button); 
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.3s ease;
  text-align: center; 
}

.filterButton i,
.calenderButton i {
  font-size: 1.5rem; 
}

.filterButton:hover,
.calenderButton:hover {
  background: #e11d48;
}

.movieCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 30px;
  row-gap: 70px;
  margin-top: 30px;
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
  background: radial-gradient(circle at bottom, rgba(24, 31, 47, 1), transparent 100%);
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
