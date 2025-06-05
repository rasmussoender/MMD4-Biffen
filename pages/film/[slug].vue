<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '#app'

// Seo/meta
// Her definerer vi title, metadescripton og keywords til seo

useHead({
  title: 'Film',
  meta: [
    {
      name: 'description',
      content: 'Biograffilm hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'biograf, aalborg, film, vintage, se'
    }
  ]
})

// variabel for movie, som default er på null
const movie = ref(null);
// // Variabel til at hente route for url.
const route = useRoute();
const slug = route.params.slug;

// Opretter tomt reaktiv array til skuespillere og tom string til backdrop
const cast = ref([]);
const backdropImage = ref('');
// API key til https://www.themoviedb.org/
const TMDB_API_KEY = 'b65594f1d77a7f9b07f9c713616d0cc8';

const visibleStart = ref(0);
// Viser altid 5 visninger
const visibleCount = ref(5);

// Når den bliver vist i dom'en, kører funktionen.
onMounted(async () => {
  try {
    // Henter filmdata fra WP rest api, baseret på slug
    const response = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?slug=${slug}`);
    // Konverterer til json
    const data = await response.json();
    // den første film i movie variablen
    movie.value = data[0];

    // Finder moviedv_id som vi har sat ind i SCF i WP
    const tmdbId = movie.value?.acf?.moviedb_id;
    // Tjekker om der er blevet sat et id ind
    if (tmdbId) {
      // Hvis ja, starter den med at hente skuespillerne, og sætter det id ind i moviedb's api url. Den sætter også vores API KEY ind, så den kan verify us.
      const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}/credits?api_key=${TMDB_API_KEY}&language=da`);
      const castData = await castResponse.json();
      // gemmer de øveste 6 skuespillere, hvis der er ingen gemmes de i et tomt array
      cast.value = castData.cast?.slice(0, 6) || [];

      // Så henter den detaljer om filmen (herinde backdrop, og vote average ligger)
      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=da`);
      const movieData = await movieResponse.json();
      // Hvis der så findes et backdrop_path, gemmes url'en i backdropImage
      if (movieData.backdrop_path) {
        backdropImage.value = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
      }
      // Hvis der så findes et vote_average gemmes url'en i movie.value
      if (movieData.vote_average) {
        movie.value.rating = movieData.vote_average;
      }
    }
    // Fanger errors, hvis der skulle ske noget
  } catch (error) {
    console.error('Der skete en fejl!', error);
  }
});

// Knapper for at vise flere spilletider
// 
const nextDays = () => {
  // Hvis der findes data i movie variablen, finder den alle visningsdage
  if (movie.value) {
    const total = movie.value.acf.spilletider.filmvisning.length;
    //Tjekker om de næste visninger er mindre end det totale antal, om der er flere dage at vise
    if (visibleStart.value + visibleCount.value < total) {
      // Hvis ja, flyttes det fremad med antallet af viste dage, så næste dage bliver synligt.
      visibleStart.value += visibleCount.value;
    }
  }
};

// Definerer prevdays, som tjekker om den kan flytte visningen bagud uden at gå under 0
const prevDays = () => {
  if (visibleStart.value - visibleCount.value >= 0) {
    // Hvis det er muligt at flytte den bagud, så viser den dem
    visibleStart.value -= visibleCount.value;
  }
};

// Opretter computed property
const visibleSessions = computed(() => {
  // liste med alle de dage, hvor filmen vises. 
  // Bruger slice til kun at vise de 5 dage, startende fra visibleStart.
  return movie.value?.acf.spilletider.filmvisning.slice(
    visibleStart.value,
    visibleStart.value + visibleCount.value
  ) || [];
});

// Formaterer datoen 
const formattedDate = (str) => {
  // splitter en dato i tekstform dag/måned op, konverterer delene til tal, og gemmer dem som dag og måned
  const [d, m] = str.split('/').map(Number);
  // Opretter en dato, sætter bare året til 2000 da vi kun er interreseret i måned og dag.
  const date = new Date(2000, m - 1, d);
  // For at ændre formateringen på datoen, returnes der html så vi kan style måneden og dagen korrekt
  return `
    <div class="dateContent">
      <div class="date-day">${d}</div>
      <div class="date-month">${date.toLocaleString('da-DK', { month: 'long' })}</div>
    </div>
  `;
};
</script>



<template>
  <main v-if="movie" class="movieDetailsPage">


    <section class="movieHeroWrapper" :style="{
  background: `
    linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
    radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
    url(${backdropImage})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}">
<HeaderImageBackground />

<div class="hero widthContainer">
        
                <div class="backButton underlineAnimationLinks ">
              <NuxtLink
                to="#"
                class="backbtn"
                @click.prevent="$router.back()"
              >
                <i class="fa fa-arrow-left"></i> Tilbage
              </NuxtLink>
            </div>
        <img :src="movie.acf.poster.url" :alt="movie.title.rendered" class="moviePoster" />

        <div class="movieInfoBox">
            <p class="forside-hero-genre">
            <template v-for="(g, i) in movie.acf.genre" :key="i">
                <span>{{ g.filmgenre }}</span>
                <span v-if="i < movie.acf.genre.length - 1" class="forside-hero-genre-separator">|</span>
            </template>
            </p>

          <h1>{{ movie.title.rendered }}</h1>

          <div class="movieMetadata">
            <span id="ratingStyle">
              <i class="fa-solid fa-star"></i> {{ movie.rating ? movie.rating.toFixed(1) : 'Ukendt' }}/10
            </span>

            <span><i class="fa-solid fa-calendar-days"></i> {{ movie.acf.udgivelsesdato }}</span>
            <span><i class="fa-solid fa-clock"></i> {{ movie.acf.varighed }} t</span>
            <span v-if="movie.acf.age.length"><i class="fa-solid fa-user-shield"></i> {{ movie.acf.age[0].aldersgraense }}</span>
          </div>

          <p class="movieinstructor">Instruktør(ere): {{ movie.acf.movieinstructor.map(i => i.instructor).join(', ') }}</p>
          <p class="moviedescription">{{ movie.acf.description }}</p>
          <div class="generalButtons">
            <a :href="movie.acf.trailer" target="_blank" class="generalbtn btn-primary"> <i class="fa-brands fa-youtube"></i> Se trailer</a>
            <a :href="movie.acf.tmdb" target="_blank" class="generalbtn btn-secondary"> <i class="fa-solid fa-circle-info"></i> Læs mere</a>
          </div>
        </div>
      </div>
    </section>
<div class="widthContainer">

  <section class="showtimesSection">
    <div class="timesWrapper">
      <div class="arrowsWrapper">
        
        <div class="timesNav left">
          <button @click="prevDays" :disabled="visibleStart === 0">
            <i class="fa-solid fa-caret-left"></i>
          </button>
        </div>
        <div class="timesNav right">
          <button @click="nextDays" :disabled="visibleStart + visibleCount >= movie.acf.spilletider.filmvisning.length">
            <i class="fa-solid fa-caret-right"></i>
          </button>
        </div>
      </div>
      
      <div class="days">
        <div class="showtimeDayCard" v-for="session in visibleSessions" :key="session.filmdato">
          <div class="dateCard">
            <h4 class="date" v-html="formattedDate(session.filmdato)"></h4>
          </div>
          <div class="showtimeSlots">
            <router-link
            v-for="time in session.spilletid"
            :key="time.spilletidspunkt"
            class="time"
            :to="`/film/visning/${movie.slug}/${session.filmdato.replaceAll('/', '-')}/${time.spilletidspunkt.replace(':', '-')}`"
            >
            {{ time.spilletidspunkt }}
          </router-link>
        </div>
      </div>
    </div>
    
  </div>
</section>

<section class="actors">
  <h2 class="overskrift-med-streg"><span>Top skuespillere</span></h2>
  
  <div class="actorSection">
    <a
    class="actorGroup"
    v-for="actor in cast"
    :key="actor.id"
    :href="`https://www.themoviedb.org/person/${actor.id}`"
    target="_blank"
    rel="noopener noreferrer"
    >
    <img
    class="actorImg"
    :src="actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : '/img/actorPlaceholderIMG.jpg'"
    :alt="actor.name"
    />
    <h3 class="actorName">{{ actor.name }}</h3>
    <h4 class="actorRole">{{ actor.character }}</h4>
  </a>
</div>
<div class="actorbutton">
  <a :href="movie.acf.moviedb_actors" target="_blank" class="generalbtn btn-primary">Se alle skuespillere</a>
</div>
</section>
</div>
</main>

<div v-else><i class="fa fa-spinner fa-spin"> </i>Loader film detaljer...</div>
<Footer />
</template>


<style scoped>
.forside-hero-genre {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  font-weight: 400;

}


.forside-hero-genre-separator {
  padding: 0 0.5rem;
  color: white;
}

.movieDetailsPage {
  padding: 0;
  margin: 0 auto;
  width: 100%;
}

.movieDetailsPage p {
  font-size: 15px;
}

.movieHeroWrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  background-size: cover;
  background-position: center;
  border-radius: var(--radius-section);
  justify-content: center;
  align-items: center;
  border-radius: 0;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 0 4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
    padding: var(--space-container);

}

.backButton {
  width: 100%;
  padding-top: 3rem;
  margin-bottom: 1rem;
}

.backbtn {
  padding: 0.6rem 0;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
  color: white;
}

.btn {
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95rem;
  color: white;
  border-radius: 5px;
}
.moviePoster {
  flex: 0 1 35%;
  width: 100%;
  aspect-ratio: 2 / 3;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-section);
  box-shadow: 0px 0px 20px 2px #4C90FF;
  max-width: 500px;
  overflow: hidden; 
  display: block;
}



.movieInfoBox {
  flex: 1 1 55%;
  background: rgba(32, 47, 77, 0.85);
  padding: 2rem;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
}

.movieInfoBox h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}


.movieMetadata {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.movieMetadata span {
  background: #181F2F;
  padding: 5px 8px;
  border-radius: var(--radius-button);
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.movieMetadata span i {
  color: var(--interactive-red);
}

#ratingStyle {
  background-color: rgba(234, 179, 5, 0.15);
}

#ratingStyle i {
  color: #EAB305;
}

.movieinstructor {
  font-weight: bold;
  margin: 0.5rem 0;
}

.moviedescription {
  margin: 1rem 0;
}

.showtimesSection {
  background: var(--secondary-blue);
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-top: 5rem;
  padding-bottom: 5rem;
  margin: var(--space-container);
  margin-top: 0;
}

.days {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 3rem;
}

.showtimeDayCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  width: 10rem;
}

.dateCard {
  background-color: var(--color-body);
  padding: 0.5rem;
  border-radius: var(--radius-button);
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.dateContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  line-height: 1;
}

.dateCard h4 {
  margin: 0;
  font-size: 1.3rem;
}

.showtimeSlots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.time {
  background: #ff3b5c;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-button);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
}

.timesWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.timesNav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
.timesNav.left {
  left: 1rem;
}
.timesNav.right {
  right: 1rem;
}

.timesNav button {
  background: var(--interactive-red);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;
}

.timesNav button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* === Skuespillere === */
.actors {
  padding: var(--space-container);
  padding-top: 0;
  position: relative;
  z-index: 1;
}

.actors a {
  text-decoration: none;
}

.actorSection {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 2rem;
}

.actorImg {
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.5s ease;
}

.actorImg:hover {
  transform: scale(1.10);
}

.actorName,
.actorRole {
  text-align: center;
  margin-top: 0.3rem;
  margin-bottom: 0;
}

.actorName {
  font-size: 16px;
  font-weight: bold;
}

.actorRole {
  font-size: 15px;
  font-weight: 200;
}

.actorbutton {
  margin-top: 1rem;
  display: flex;
  justify-content: right;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (max-width: 768px) {
  .movieHeroWrapper {
    padding: 0;
    padding-top: 100px;
  }

  .hero {
    padding: 0 20px;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .moviePoster {
    width: 250px;
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-section);
    box-shadow: 0px 0px 20px 2px #4C90FF;
  }

  .movieInfoBox {
    padding: 1.5rem 20px;
    width: 100%;
    margin: 0 auto;
  }

  .showtimesSection {
    width: calc(100% - 40px);
    padding: 3rem 20px;
    border-radius: 12px;
    background: var(--secondary-blue);
    box-sizing: border-box;
    margin: 5rem 20px;
  }

  .actors {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 3rem;
  }

  .actorSection {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 3rem;
  }

  .timesWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    box-sizing: border-box;
    flex-wrap: wrap;
  }

  .arrowsWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin-bottom: 1rem;
  }

  .timesNav {
    position: relative;
    transform: none;
    width: auto;
    display: flex;
    justify-content: center;
  }

  .timesNav.left,
  .timesNav.right {
    flex: 1;
    justify-content: flex-start;
  }

  .timesNav.right {
    justify-content: flex-end;
  }

  .days {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: nowrap;
    overflow: hidden;
    padding: 0;
    box-sizing: border-box;
    gap: 2rem;
  }

  .showtimeDayCard {
    flex: 1;
    min-width: 0;
    width: 100%;
    box-sizing: border-box;
    gap: 0;
  }

  .dateCard {
    height: 8rem;
    font-size: 0.9rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .date-day {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ff3b5c;
  }

  .date-month {
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .showtimeSlots {
    flex-direction: column;
    gap: 0.4rem;
  }

  .time {
    width: 100%;
    font-size: 0.85rem;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
  }

  .backButton {
    position: relative;
  }

  .days::-webkit-scrollbar {
    display: none;
  }

  .days {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .movieHeroWrapper {
    padding: 0;
    padding-top: 100px;
  }

  .hero {
    padding: 0 50px;
    flex-direction: column;
    align-items: center;
  }

  .moviePoster {
    width: 250px;
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-section);
    box-shadow: 0px 0px 20px 2px #4C90FF;
  }

  .movieInfoBox {
    padding: 1.5rem 50px;
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
  }

  .showtimesSection {
    width: calc(100% - 100px);
    padding: 3rem 50px;
    border-radius: 12px;
    background: var(--secondary-blue);
    box-sizing: border-box;
    margin: 5rem 50px;
  }

  .actors {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 3rem;
  }

  .actorSection {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-bottom: 3rem;
  }

  .actorImg {
    width: 100%;
    height: 340px;
    object-fit: cover;
    object-position: top;
    border-radius: 8px;
    transition: transform 0.5s ease;
  }

  .actorImg:hover {
    transform: scale(1.10);
  }

  .actorName,
  .actorRole {
    text-align: center;
    margin-top: 0.3rem;
    margin-bottom: 0;
  }

  .actorName {
    font-size: 16px;
    font-weight: bold;
  }

  .actorRole {
    font-size: 15px;
    font-weight: 200;
  }

  .actorbutton {
    margin-top: 1rem;
    display: flex;
    justify-content: right;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .timesWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1rem;
    box-sizing: border-box;
    flex-wrap: wrap;
  }

  .arrowsWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin-bottom: 1rem;
  }

  .timesNav {
    position: relative;
    transform: none;
    width: auto;
    display: flex;
    justify-content: center;
  }

  .timesNav.left,
  .timesNav.right {
    flex: 1;
    justify-content: flex-start;
  }

  .timesNav.right {
    justify-content: flex-end;
  }

  .days {
    flex-direction: row;
    justify-content: space-between;
    gap: 0.8rem;
    width: 100%;
    flex-wrap: nowrap;
    overflow: hidden;
    padding: 0;
    box-sizing: border-box;
  }

  .showtimeDayCard {
    flex: 1;
    min-width: 0;
    max-width: calc(25% - 0.75rem);
    box-sizing: border-box;
  }

  .dateCard {
    height: 5rem;
    font-size: 0.9rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .date-day {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ff3b5c;
  }

  .date-month {
    font-size: 0.75rem;
    text-transform: capitalize;
  }

  .showtimeSlots {
    flex-direction: column;
    gap: 0.4rem;
  }

  .time {
    width: 100%;
    font-size: 0.85rem;
    padding: 0.4rem 0.3rem;
    box-sizing: border-box;
  }

  .backButton {
    margin-top: 0.5rem;
    padding-left: 50px;
    position: relative;
    top: -30px;
  }

  .days::-webkit-scrollbar {
    display: none;
  }

  .days {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}


</style>
