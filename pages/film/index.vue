<script setup>
import { ref, onMounted } from 'vue';
import { useHead } from '#app'
const movies = ref([]);

// Seo/meta
useHead({
  title: 'Alle Film',
  meta: [
    {
      name: 'description',
      content: 'Biffens film'
    },
    {
      name: 'keywords',
      content: 'biograf, alle, film, vintage, aalborg, biograftur'
    }
  ]
})


onMounted(async () => {
  try {
    const response = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?per_page=100');
    const data = await response.json();
    movies.value = data;
  } catch (error) {
    console.error('Der skete en fejl', error);
  }
});

// Kommende dato tag
const isUpcoming = (releaseDate) => {
  const today = new Date();
  const release = new Date(releaseDate);
  return release > today;
};

// Formatering af dato
const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const parsedDate = new Date(dateString);
  return parsedDate.toLocaleDateString('da-DK', options);
};

</script>


<template>
  <Header />
  <main>
    <div class="movieContainer">
      <h1 class="overskrift-med-streg"><span>Alle Film</span></h1>

      <div class="buttonContainer">
        <button class="calenderButton">
          <i class="fa-solid fa-calendar-days"></i> Kalender
        </button>
        <button class="filterButton">
          <i class="fa fa-filter"></i> Filter
        </button>
      </div>

      <div v-if="movies.length === 0">
        <i class="fa fa-spinner fa-spin"></i> Loader alle film
      </div>

      <div v-else class="movieCards">
        <div v-for="movie in movies" :key="movie.id" class="movieCard">
          <router-link :to="`/film/${movie.slug}`" class="movieLink">
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
          <router-link :to="`/film/${movie.slug}`" class="movieLink">
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
  font-size: 1.5; 
}

.filterButton:hover,
.calenderButton:hover {
  background: #e11d48;
}

.movieCards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
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