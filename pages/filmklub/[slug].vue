<script setup>
import { useHead, useFetch } from '#app'
import { useRoute } from 'vue-router'

// SEO/meta
// Her definerer vi title, metadescripton og keywords til seo
useHead({
  title: 'Filmklub',
  meta: [
    {
      name: 'description',
      content: 'Filmklub hos biffen Nordkraft'
    },
    {
      name: 'keywords',
      content: 'biograf, filmklub, film, klub, underholding'
    }
  ]
})

// Henter slug for url'en. og bruger useRoute til at få fat i url parametre
const slug = useRoute().params.slug

// Hent filmklub data ud fra slug ved hjælp af UseFetch
const { data: klubData } = await useFetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub?slug=${slug}`)
// Variabel der tjekker om der kommer data fra klubData
// Hvis ja, gemmer den filklub i variablen, hvis nej sætter den klub=null
const klub = klubData.value ? klubData.value[0] : null

// Hent kategorier, find den matchende kategori, og hent filmprogrammet ud fra kategoriid
const { data: kategorierData } = await useFetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/filmklub-kategori?per_page=100`)

// Finder den kategori, hvor slug matcher den fra URL. Gemmer den i kategori.
const kategori = kategorierData.value?.find(k => k.slug === slug)

// Henter filmprogrammet fra API, som hører til den valgte kategori.
const { data: filmProgramData } = await useFetch(`https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?filmklub-kategori=${kategori?.id}&per_page=100&_embed`)

// Hvis vi får data, gemmer den dem i filmProgram. Hvis ikke, brug en tom liste
const filmProgram = filmProgramData.value || []

// Backdropbillede
// Henter backdrop billede fra SCF, Hvis det ikke findes, bruges en tom string.
const backdropImage = klub?.acf?.['filmklub-billede']?.url || ''
</script>



<template>
  <section
  class="movieHeroWrapper"
    v-if="klub"
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

    
    <div class="hero widthContainer">
      <div class="backButton underlineAnimationLinks">
        <NuxtLink to="/filmklub" class="backbtn">
          <i class="fa fa-arrow-left"></i> Tilbage
        </NuxtLink>
      </div>
      <div class="movieInfoBox">


        <h2 class="overskrift-med-streg"><span></span><span v-html="klub?.title?.rendered" /></h2>

        <div class="movie-description-container">
          <div v-if="klub?.acf?.['filmklub-gruppe1']">
            <h3>{{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-title'] }}</h3>
            <p>{{ klub.acf['filmklub-gruppe1']['filmklub-gruppe1-tekst'] }}</p>
          </div>

          <div v-if="klub?.acf?.['filmklub-gruppe2']">
            <h3>{{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-title'] }}</h3>
            <p>{{ klub.acf['filmklub-gruppe2']['filmklub-gruppe2-tekst'] }}</p>
          </div>

          <div v-if="klub?.acf?.['filmklub-gruppe3']">
            <h3>{{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-title'] }}</h3>
            <p>{{ klub.acf['filmklub-gruppe3']['filmklub-gruppe3-tekst'] }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <main v-if="klub" class="movieDetailsPage widthContainer">
    <h2 class="overskrift-med-streg"><span>Program</span></h2>
    <section>
      <div class="film-program-container">

        <div
          v-if="filmProgram.length > 0"
          v-for="film in filmProgram"
          :key="film.id"
          class="film-program"
        >
          <div class="film-program-content">
            <div class="program-film-poster">
              <img
                :src="film.acf?.poster?.url"
                :alt="film.acf?.title || film.title.rendered"
              />
            </div>

            <div class="film-program-detaljer">
              <div class="film-program-titel-og-info">
                <h3>{{ film.acf?.title || film.title.rendered }}</h3>
                <ul>
                  <li>
                    <i class="fas fa-clock"></i>{{ film.acf?.varighed }}
                  </li>
                  <li>
                    <i class="fas fa-child-reaching"></i>{{ film.acf?.age?.[0]?.aldersgraense }}
                  </li>
                </ul>
              </div>

              <hr class="film-program-hr" />

              <div class="film-information-container">
                <div class="film-program-dato-beskrivelse">
                  <div class="film-program-dato">
                    <p>
                      <i class="fa-solid fa-calendar-days"></i>
                      {{ film.acf?.udgivelsesdato }}
                    </p>
                  </div>
                  <div class="film-program-beskrivelse">
                    <p>{{ film.acf.description.length > 200 ? film.acf.description.slice(0, 200) + '...' : film.acf.description }}</p>

                  </div>
                </div>

                <div class="generalButtons">
                  <NuxtLink :to="`/film/${film.slug}`" class="generalbtn btn-primary">
                    Mere info
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          Ingen film fundet i kategori.
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>

  

<style scoped>


.movieDetailsPage p {
  font-size: 15px;
}


@media (min-width: 1500px) {
  .widthContainer {
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  }
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
  gap: 2rem;
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

@media (max-width: 1000px) {
  .movie-description-container {
    flex-direction: column;
    gap: 1rem;
    margin-top: 0;
  }

  .backButton {
  padding-top: 5rem;
}

.hero {
  gap: 1rem
}



}



</style>


