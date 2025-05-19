<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const slug = useRoute().params.slug
const klub = ref(null)
const filmProgram = ref([])
const backdropImage = ref('')

onMounted(async () => {
  try {
    const klubData = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub?slug=${slug}`).then(res => res.json())
    klub.value = klubData[0]
    backdropImage.value = klub.value.acf?.['filmklub-billede'].url 

    const kategorier = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub-kategori?per_page=100`).then(res => res.json())
    const kategori = kategorier.find(k => k.slug === slug)

    filmProgram.value = await fetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?filmklub-kategori=${kategori?.id}&per_page=100&_embed`).then(res => res.json())
  } catch (err) {
    console.error('Fejl:', err)
  }
})
</script>


<template>
    <main v-if="klub" class="movieDetailsPage">
      <section
        class="movieHeroWrapper"
        :style="{
          background: `
            linear-gradient(to bottom, rgba(24, 31, 47, 0) 40%, #181F2F 100%),
            radial-gradient(circle at 80% center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.75) 100%),
            url(${backdropImage})
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      >
        <HeaderImageBackground />
  
        <div class="backButton">
          <NuxtLink to="/filmklub" class="backbtn">
            <i class="fa fa-arrow-left"></i> Tilbage
          </NuxtLink>
        </div>
  
        <div class="hero">
          <div class="movieInfoBox">
            <h2 class="overskrift-boks-1"><span v-html="klub.title.rendered" /></h2>
  
            <div class="movie-description-container">
              <div v-if="klub.acf['filmklub-gruppe1']">
                <h3>{{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-title'] }}</h3>
                <p>{{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-tekst'] }}</p>
              </div>
  
              <div v-if="klub.acf['filmklub-gruppe2']">
                <h3>{{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-title'] }}</h3>
                <p>{{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-tekst'] }}</p>
              </div>
  
              <div v-if="klub.acf['filmklub-gruppe3']">
                <h3>{{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-title'] }}</h3>
                <p>{{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-tekst'] }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section>
        
        <div class="film-program-container">
          <h2 class="overskrift-med-streg"><span>Program</span></h2>
          <div
            v-if="filmProgram.length > 0"
            class="film-program"
            v-for="film in filmProgram"
            :key="film.id"
          >
            <div class="film-program-content">
              <div class="program-film-poster">
                <img
                  :src="film.acf?.poster?.url || '../assets/img/placeholder.jpg'"
                  :alt="film.acf?.title || film.title.rendered"
                />
              </div>
              <div class="film-program-detaljer">
                <div class="film-program-titel-og-info">
                  <h3>{{ film.acf?.title || film.title.rendered }}</h3>
                  <ul>
                    <li>
                      <i class="fas fa-clock"></i>{{ film.acf?.varighed || 'Ukendt tid' }}
                    </li>
                    <li>
                      <i class="fas fa-child-reaching"></i>{{ film.acf?.age?.[0]?.aldersgraense || 'Aldersmærke mangler' }}
                    </li>
                  </ul>
                </div>
  
                <hr class="film-program-hr" />
  
                <div class="film-information-container">
                  <div class="film-program-dato-beskrivelse">
                    <div class="film-program-dato">
                      <p>
                        <i class="fa-solid fa-calendar-days"></i>
                        {{ film.acf?.udgivelsesdato || 'Udgivelsesdato ukendt' }}
                      </p>
                    </div>
                    <div class="film-program-beskrivelse">
                      <p>{{ film.acf?.filmklub_film_beskrivelse || 'Beskrivelse mangler.' }}</p>
                    </div>
                  </div>
<div class="read-more-button-container">
  <NuxtLink :to="`/film/${film.slug}`" class="read-more-btn">
    Mere info
  </NuxtLink>
</div>

                </div>
              </div>
            </div>
          </div>
  
          <div v-else style="color: white; margin-top: 2rem;">
            Ingen film fundet i kategori 13.
          </div>
        </div>
      </section>
    </main>
  
    <div v-else>Indlæser filmklub...</div>
    <Footer />
  </template>
  

<style scoped>
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
  margin-bottom: 3rem;
  position: relative;
  background-size: cover;
  background-position: center;
  padding: var(--space-container);
  justify-content: center;
  align-items: center;
  border-radius: 0;
}

.hero {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: stretch;
  width: 100%;
}

.backButton {
  width: 100%;
  padding-top: 2rem;
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

.movieInfoBox {
  flex: 1 1 55%;
  background: rgba(32, 47, 77, 0.85);
  padding: 50px;
  border-radius: var(--radius-section);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
}

.movieInfoBox h1 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.genreTags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 15px;
}

.genreItem {
  position: relative;
  padding: 0 0.5rem;
  font-weight: bold;
}

.genreItem:not(:last-child)::after {
  content: '|';
  position: absolute;
  right: -0.5rem;
  color: white;
}

.movieMetadata {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.moviedescription {
  margin: 1rem 0;
}

.movie-description-container {
  display: flex;
  gap: 4rem;
  margin-top: 3rem;
}

.movie-description-container h3 {
  font-size: 35px;
  color: white;
  font-weight: 700;
}

.movie-description-container p {
  font-size: 18px;
  color: white;
  line-height: 1.75;
}

.overskrift-boks-1 {
  font-size: 55px;
  font-weight: 700;
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

.overskrift-med-streg {
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 1rem;
  max-width: 100%;
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
  padding: var(--space-section);

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
  align-items: stretch;
  padding-bottom: 6rem;
  height: 100%;
}

.film-program-content:last-child {
  padding-bottom: 0;
}

.program-film-poster {
  display: flex;
  align-items: stretch;
}

.program-film-poster img {
  width: 100%;
  max-width: 300px;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 1.75rem;
}

.film-information-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.film-program-dato-beskrivelse {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.film-program-beskrivelse {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.film-program-beskrivelse p {
  font-size: 18px;
  color: white;
  line-height: 1.75;
}

.film-program-dato {
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #131C31;
  color: white;
  width: fit-content;
}

.film-program-dato p {
  font-size: 16px;
}

.film-program-dato i {
  color: #F63758;
  margin-right: 0.5rem;
}

.read-more-button-container {
  margin-top: auto;
}

.read-more-btn {
  background: var(--interactive-red);
  color: white;
  padding: 15px 25px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: var(--radius-button);
  cursor: pointer;
  display: inline-flex; 
  gap: 10px;
  width: auto;
  transition: background 0.3s;
  text-decoration: none;
  align-items: center;   
}

.read-more-btn:hover {
  background: #e11d48;
}


@media (max-width: 768px) {
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
}
</style>


