<script setup>
import { useHead, useFetch } from '#app'

useHead({
  title: 'Cinemateket',
  meta: [
    {
      name: 'description',
      content: 'Cinemateket i Biffen'
    },
    {
      name: 'keywords',
      content: 'biograf, Cinemateket, film, vintage, filmklub'
    }
  ]
})

const { data: filmProgram, pending, error } = await useFetch(
  'https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?cinemateket=16&per_page=100&_embed'
)
</script>

<template>
  <Header />
  <main class="widthContainer">
    <div class="section-boks-1-container">
      <div class="section-boks-1">
        <div class="section-boks-1-content">
          <div class="section-boks-1-text">
            <h4 class="subtitle-boks-1">Hvad er</h4>
            <h2 class="overskrift-boks-1"><span>Cinemateket</span></h2>
            <p class="section-boks-1-bold">STORE KLASSIKERE, SJÆLDNE FILMPERLER, SPÆNDENDE EVENTS</p>
            <p class="section-boks-1-beskrivelse">
              CINEMATEKET I BIFFEN byder hver tirsdag og udvalgte dage på klassikere, kultfilm og sjældne perler fra filmhistorien – film du sjældent ser i danske biografer. Udvalgt i samarbejde med Cinemateket og vist i Biffen i Nordkraft, ofte med introduktion, mad eller musik. Se programmet her. OBS: Filmene vises uden danske undertekster, medmindre andet er angivet.
            </p>
            <p class="section-boks-1-beskrivelse">Entré: 100 kr. (evt. tillæg ved events/helaftensfilm)</p>
          </div>
          <div class="section-boks-1-img">
            <img src="/public/img/cinemateket.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <section>
      <h2 class="overskrift-med-streg"><span>Cinematekets Program</span></h2>

      <div v-if="pending">
        <i class="fa fa-spinner fa-spin"></i> Loader alle film
      </div>

      <div v-else-if="error">
        <p>Kunne ikke hente filmene</p>
      </div>

      <div v-else class="film-program-container">
        <div
          v-if="filmProgram.length > 0"
          class="film-program"
          v-for="film in filmProgram"
          :key="film.id"
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
                    <i class="fas fa-clock"></i> {{ film.acf?.varighed }}
                  </li>
                  <li>
                    <i class="fas fa-child-reaching"></i> {{ film.acf?.age?.[0]?.aldersgraense }}
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
                    <p>
                      {{ film.acf.description.length > 200
                        ? film.acf.description.slice(0, 200) + '...'
                        : film.acf.description }}
                    </p>
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

        <div v-else>
          Ingen film fundet i kategori 13.
        </div>
      </div>
    </section>
  </main>
  <Footer />
</template>



<style scoped>
.section-boks-1-container {
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
  align-items: center;
  gap: 70px;
}

.section-boks-1-text,
.section-boks-1-img {
  flex: 1;
  max-width: 50%;
}

.section-boks-1-img img {
  width: 100%;
  height: 100%;
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
  margin-top: 1rem;
}

.section-boks-1-bold {
  font-weight: bold;

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


/* Mobile: max-width 768px */
@media (max-width: 768px) {


  .section-boks-1 {
    padding: var(--space-container);
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
  
}





</style>
