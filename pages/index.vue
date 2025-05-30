<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '#app'

// Seo/meta
useHead({
  title: 'Forside',
  meta: [
    {
      name: 'description',
      content: 'Biffen Nordkraft i Aalborg'
    },
    {
      name: 'keywords',
      content: 'biograf, aalborg, film, vintage'
    }
  ]
})



// Filmprogram
const moviesProgram = ref([])
onMounted(async () => {
  try {
    const res = await fetch('https://biffen.rasmus-pedersen.com/wp-json/wp/v2/movie?forside-program=18&_embed')
    moviesProgram.value = await res.json()
  } catch (e) {
    console.error('Fejl ved hentning af film:', e)
  }
})
</script>



<template>

  <HeaderImageBackground />
  <HeroSlider />
  
  <main class="widthContainer">
    <section>
      <div class="section-boks-1-container">
        <div class="section-boks-1">
          <div class="section-boks-1-content">
            <div class="section-boks-1-text">
              <h2 class="subtitle-boks-1">Velkommen til</h2>
              <h2 class="overskrift-boks-1"><span>Biffen</span></h2>
              <p class="section-boks-1-beskrivelse">Biffen Nordkraft er Aalborgs eneste uafhængige biograf. Vi har specialiseret os i små som store filmperler, som ikke altid finder vej til de traditionelle biografer. I vores 3 sale vises der både nye premierefilm og historiske klassikere. Derudover afholder vi filmfestivaler (f.eks. CPH DOX) og arrangerer oplæg og interviews med instruktører og skuespillere m. fl. - altid med den gode film i centrum.</p>
            </div>
            <div class="section-boks-1-video">
              <video autoplay muted loop aria-hidden="true">
                  <source src="../assets/vid/biffen-video-forside.mp4" type="video/mp4" />
                  Din browser understøtter ikke videoafspilning.
              </video>

            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 class="overskrift-med-streg"><span>Populære film</span></h2>

<div class="film-program-container">
  <div class="film-program">
    <div 
      class="film-program-content" 
      v-for="movie in moviesProgram" 
      :key="movie.id"
    >
<div class="program-film-poster">
  <img 
    v-if="movie.acf?.poster?.url" 
    :src="movie.acf.poster.url" 
    :alt="movie.title.rendered" 
  />
</div>

      <div class="film-program-detaljer">
        <div class="film-program-titel-og-info">
          <h3 v-html="movie.title.rendered"></h3>
          <ul>
            <li><i class="fas fa-clock"></i> {{ movie.acf?.varighed }}</li>
            <li><i class="fas fa-child-reaching"></i> {{ movie.acf.age?.[0]?.aldersgraense }}</li>

          </ul>
        </div>
        <hr class="film-program-hr">
        <!-- Eventuelt program -->
                <div class="film-information-container">
                <div class="film-program-dato-beskrivelse">

                  <div class="film-program-beskrivelse">
                    <p>{{ movie.acf.description.length > 300 ? movie.acf.description.slice(0, 300) + '...' : movie.acf.description }}</p>
                  </div>
                </div>
                <div class="read-more-button-container">
                  <NuxtLink :to="`/film/${movie.slug}`" class="read-more-btn">
                    Mere info
                  </NuxtLink>
                </div>
              </div>
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

    <section class="kommendeFilmIndex">
    <h2 class="overskrift-med-streg"><span>Nyheder på vej</span></h2>

      <KommendeFilm :limit="4" />

        <div class="vis-flere-film-cta">
        <a href="/kommende-film">
          Se kommende film
          <span class="material-symbols-outlined">arrow_circle_right</span>
        </a>
      </div>

    </section>


<section class="forside-entry-section">
  <div class="forside-entry-grid">

    <a href="/cinemateket" class="forside-entry-card forside-entry-card--white-bg">
      <img src="../assets/img/cinemateket-entry.png" alt="Card 1">
      <hr>
      <h3>Cinemateket</h3>
      <p>Oplev store klassikere, sjældne filmperler og spændende events i Cinemateket i Biffen.</p>
    </a>

    <a href="/filmklub" class="forside-entry-card">
      <img src="../assets/img/filmklubben-entry.png" alt="Card 2">
      <hr>
      <h3>Filmklubber</h3>
      <p>Meld dig ind i en filmklub, og se udvalgte film til reduceret pris!</p>
    </a>

    <a href="/events" class="forside-entry-card">
      <img src="../assets/img/events-entry.png" alt="Card 3">
      <hr>
      <h3>Events</h3>
      <p>Biffen arrangerer året igennem en lang række spændende events - altid med den gode film i centrum.</p>
    </a>

    <a href="/gavekort-og-ovrige-billetter" class="forside-entry-card">
      <img src="../assets/img/gavekort-entry.png" alt="Card 4">
      <hr>
      <h3>Gavekort</h3>
      <p>Et gavekort til Biffen er mere end bare en gave – det er en oplevelse. Se også vores øvrige billetter.</p>
    </a>

    <a href="/book-en-sal" class="forside-entry-card">
      <img src="../assets/img/a-salen_lille.jpg" alt="Card 5">
      <hr>
      <h3>Book en biografsal</h3>
      <p>Book en af vores sale. Perfekt til skoler, virksomhedsarrangementer, børnefødselsdage mm.</p>
    </a>

    <a href="/praktisk-information" class="forside-entry-card">
      <img src="../assets/img/kontakt-entry.jpg" alt="Card 6">
      <hr>
      <h3>Kontakt os</h3>
    </a>

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
    
    <Newsletter />
    
  </main>
 <Footer />

</template>

<style scoped>


.section-boks-1-container {

  margin-top: 8rem;
  margin-bottom: var(--space-section);
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


.kommendeFilmIndex {
  padding-bottom: var(--space-section);
}




.vis-flere-film-cta {
  display: flex;
  justify-content: flex-end;
  margin-bottom: var(--space-section) ;
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
  margin-bottom: var(--space-section);
}
.forside-entry-card {
    text-decoration: none;
    color: white;

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
  gap: 7rem;
  padding: var(--space-section);
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




/* Responsivitet */

/* Mobile: max-width 768px */
@media (max-width: 768px) {


  .forside-entry-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

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
  .samarbejde-container {
    gap: 40px;
  }


  .vis-flere-film-cta {
    justify-content: center;
  }

}






</style>
